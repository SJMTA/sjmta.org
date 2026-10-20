/** Browser checks for every page, navigation, and operation without JavaScript.
 * Run: npm run test:browser
 * Optional: BROWSER_EXECUTABLE_PATH=/path/to/chrome npm run test:browser
 * Optional one-time refactor comparison: CONTENT_BASELINE=/path/to/snapshot.json
 */
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const pagePaths = [
  "index.html",
  ...(await readdir(path.join(root, "src/pages")))
    .filter((name) => name.endsWith(".html"))
    .map((name) => `src/pages/${name}`),
];
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".ttf": "font/ttf",
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname === "/favicon.ico") {
      response.writeHead(204).end();
      return;
    }
    let file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const origin = `http://127.0.0.1:${server.address().port}`;
const baseline = process.env.CONTENT_BASELINE
  ? JSON.parse(await readFile(process.env.CONTENT_BASELINE, "utf8"))
  : null;
const normalize = (text) => text.replace(/\s+/g, "");
let browser;
try {
  browser = await chromium.launch({
    executablePath: process.env.BROWSER_EXECUTABLE_PATH || undefined,
  });
  const context = await browser.newContext();
  // External maps and sites are not part of this local regression test.
  await context.route("**/*", (route) =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort(),
  );
  const page = await context.newPage();
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    if (response.url().startsWith(origin) && response.status() >= 400)
      failures.push(`${response.status()} ${response.url()}`);
  });
  await mkdir(path.join(root, "test-results"), { recursive: true });
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    await page.setViewportSize(viewport);
    for (const pagePath of pagePaths) {
      await page.goto(`${origin}/${pagePath}`);
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => ({
        text: document.body.innerText,
        links: [...document.querySelectorAll("a[href]")].map((a) => ({
          href: a.getAttribute("href"),
          text: a.textContent.replace(/\s+/g, " ").trim(),
        })),
        ids: [...document.querySelectorAll("[id]")].map((element) => element.id),
        width: document.documentElement.scrollWidth,
        viewport: innerWidth,
        brokenImages: [...document.images]
          .filter((image) => !image.complete || !image.naturalWidth)
          .map((image) => image.src),
      }));
      assert.ok(
        (await page.locator("main").innerText()).length > 100,
        `Missing main content: ${pagePath}`,
      );
      assert.deepEqual(result.brokenImages, [], `Broken images: ${pagePath}`);
      assert.ok(
        result.width <= result.viewport + 1,
        `Horizontal overflow at ${viewport.width}px: ${pagePath} (${result.width}px)`,
      );
      if (pagePath === "index.html") {
        const events = page.locator(".events-list");
        await events.evaluate((panel) => {
          panel.scrollTop = panel.scrollHeight;
        });
        const lastEventIsReachable = await events.evaluate((panel) => {
          const panelBounds = panel.getBoundingClientRect();
          const linkBounds = panel.querySelector(".event:last-child a").getBoundingClientRect();
          return linkBounds.top >= panelBounds.top && linkBounds.bottom <= panelBounds.bottom;
        });
        assert.ok(lastEventIsReachable, `Last homepage event clipped at ${viewport.width}px`);
        await events.evaluate((panel) => {
          panel.scrollTop = 0;
        });
      }
      if (baseline && viewport.width === 1440) {
        assert.equal(
          normalize(result.text),
          normalize(baseline[pagePath].text),
          `Visible content changed: ${pagePath}`,
        );
        for (const link of baseline[pagePath].links) {
          assert.ok(
            result.links.some(
              (actual) =>
                actual.href === link.href && normalize(actual.text) === normalize(link.text),
            ),
            `Lost link in ${pagePath}: ${link.href}`,
          );
        }
        if (pagePath !== "index.html")
          for (const id of baseline[pagePath].ids)
            assert.ok(result.ids.includes(id), `Lost page anchor: ${pagePath}#${id}`);
      }
      if (viewport.width !== 320)
        await page.screenshot({
          path: path.join(
            root,
            "test-results",
            `${viewport.width}-${pagePath.replaceAll("/", "-")}.png`,
          ),
          fullPage: true,
        });
    }
  }
  // The mobile menu must support keyboard use and recover correctly after resizing.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin);
  const toggle = page.getByRole("button", { name: "Toggle navigation" });
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  assert.equal(await navigation.isVisible(), false);
  await toggle.focus();
  await page.keyboard.press("Enter");
  assert.equal(await toggle.getAttribute("aria-expanded"), "true");
  assert.equal(await navigation.isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(await navigation.isVisible(), false);
  assert.equal(await toggle.evaluate((button) => button === document.activeElement), true);
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  assert.equal(await navigation.isVisible(), true);
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await toggle.getAttribute("aria-expanded"), "false");
  await toggle.click();
  await navigation.getByRole("link", { name: "Calendar of Events", exact: true }).click();
  assert.ok(page.url().endsWith("/src/pages/COE.html"));
  await page.goto(origin);
  await page.evaluate(() => scrollTo(0, 300));
  await page.waitForFunction(() =>
    document.querySelector("[data-site-header]").classList.contains("is-scrolled"),
  );
  await page.locator(".site-logo").click();
  await page.waitForFunction(() => scrollY === 0);
  // Every homepage navigation destination and event link is a normal working link.
  await page.setViewportSize({ width: 1440, height: 900 });
  const destinations = await page
    .locator("nav a, .event a")
    .evaluateAll((links) => links.map((a) => a.href));
  for (const url of destinations) assert.equal((await page.request.get(url)).status(), 200);
  const noScript = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await noScript.newPage();
  await staticPage.goto(origin);
  assert.ok((await staticPage.locator("main").innerText()).includes("Upcoming Events"));
  for (const link of await staticPage.locator("nav a").all())
    assert.equal(await link.isVisible(), true);
  await staticPage.getByRole("link", { name: "Calendar of Events", exact: true }).click();
  assert.ok(staticPage.url().endsWith("/src/pages/COE.html"));
  await noScript.close();
  assert.deepEqual(failures, [], "Browser errors or broken local resources");
  console.log(
    `Passed: ${pagePaths.length} pages at three widths, menu/resize/scroll behavior, navigation, and no-JavaScript use${baseline ? ", plus original content/link/anchor comparison" : ""}.`,
  );
} finally {
  if (browser) await browser.close();
  server.close();
  server.closeAllConnections();
}
