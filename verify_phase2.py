from playwright.sync_api import Page, expect, sync_playwright

def verify_phase2(page: Page):
    # 1. Home Page Verification
    print("Navigating to Home...")
    page.goto("http://localhost:3000")

    # Verify Title (or some text)
    expect(page).to_have_title("Create Next App")

    # Verify Header exists
    print("Verifying Header...")
    header = page.locator(".header")
    expect(header).to_be_visible()

    # Verify Navbar (initially hidden)
    print("Verifying Navbar toggle...")
    navbar = page.locator(".navbar")
    # expect(navbar).not_to_be_visible() # Depends on viewport, but assuming hidden

    # Click open button
    nav_btn = page.locator(".nav_open_btn")
    expect(nav_btn).to_be_visible()
    nav_btn.click()

    # Now navbar should be visible or active
    # Wait a bit for animation if any
    page.wait_for_timeout(1000)
    expect(navbar).to_be_visible()

    # Verify Footer exists
    print("Verifying Footer...")
    footer = page.locator(".footer")
    expect(footer).to_be_visible()

    # 2. Verify Navigation to Category Page
    print("Navigating to Product Marketing...")
    page.goto("http://localhost:3000/product-marketing")

    # 3. Verify GalleryGrid logic
    print("Verifying GalleryGrid...")
    gallery = page.locator(".category_gallery")
    expect(gallery).to_be_visible()

    # It should have images.
    images = gallery.locator("img")
    count = images.count()
    print(f"Found {count} images in gallery.")
    assert count > 0, "Gallery should have images"

    # Take screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification_phase2.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_phase2(page)
            print("Verification Successful!")
        except Exception as e:
            print(f"Verification Failed: {e}")
            page.screenshot(path="verification_failure.png")
            raise e
        finally:
            browser.close()
