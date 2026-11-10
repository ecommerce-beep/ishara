# Ishara — Salla custom code

Custom sections for an electronics store on Salla (Raed theme), plus a demo product catalog.

**Live preview:** a full demo store that runs the same custom code with a stand-in for the Salla SDK and 30 sample products. Prices are approximate; orders are a demo (no payment, nothing is sent; cart, wishlist and orders stay in the browser).

| Page | What it shows |
|---|---|
| `index.html` | Home: all custom sections (hero, flash sale, setup builder, quiz, compare, categories, offers…) |
| `collection.html#c1` … `#c7`, `#offers`, `#all` | Category page in two layouts (showroom and banner), filters, sorting, quick view, compare |
| `product.html#p7001` … `#p7030` | Product page: buy box, specs, and the custom bundle, installments, trade-in and FAQ sections |
| `cart.html` | Cart with quantities, coupon (`ISHARA10`), free-shipping meter |
| `checkout.html` | Checkout: contact, address, shipping and payment choice, order confirmation |
| `account.html`, `wishlist.html`, `info.html` | Orders with tracking, wishlist, store policies and contact |

The preview shell lives in `assets/` (`shop.css`, `shop.js`, `products.js`) and `img/`. Only `salla-custom-code/` goes into Salla.

## Files

| Path | What it is |
|---|---|
| `salla-custom-code/ishara-custom.css` | Paste into Salla → تصميم المتجر → الكود المخصّص → CSS |
| `salla-custom-code/ishara-custom.js` | Paste into the JavaScript box. Edit `CONFIG` and `BASICS` at the top |
| `salla-custom-code/ishara-tampermonkey.user.js` | Same code as one Tampermonkey script, to preview on the store before a domain is linked |
| `products/ishara-salla-products.xlsx` | 30 products in Salla's own import template (products sheet only) |
| `products/ishara-electronics-products.csv` | Same products as CSV |
| `products/ishara-product-photos.zip` | Product photos (1200×1200, named by SKU) |

## Shopping helpers

`CONFIG.shopping` in the JS adds store-wide interactions on top of Raed:
free-shipping progress bar on the cart page (set `threshold` to match your Salla shipping rule),
a sticky buy bar on product pages that presses the theme's own add-to-cart button,
recently viewed products, wishlist hearts on the custom sections' cards, and a back-to-top button.

## Links

Every button of the custom sections opens a real page. A slide or banner with its own `url` goes there. Without one, its `go` field picks the page: `products` (all products) or `offers` (the offers page). Those are Salla's own pages, and you can point them elsewhere in `CONFIG.links`. The story section's "تعرّف علينا" button goes to `CONFIG.links.about`. Set it to the about page you made in Salla; while it's empty the button is hidden instead of leading nowhere.

In the preview, all products is `collection.html#all` and the about page is `info.html#about`. Every link on every page was checked to open a real page or section.

## Logo

The `brand/` folder has the store logo: a signal icon (إشارة means "signal") in the store blue with the orange dot, next to the name in Readex Pro.

| File | Use |
|---|---|
| `ishara-logo.png` | Main logo, dark text, transparent background: upload it in Salla as the store logo |
| `ishara-logo-white.png` | Same logo with white text, for dark backgrounds |
| `ishara-icon-512.png` | The icon alone, 512×512: Salla's favicon / store icon |
| `ishara-icon.svg` | The icon as a vector file |

On Salla the logo is set in the dashboard (store settings), not in the custom code. The preview uses the same icon in the header, footer and browser tab.

## Background photos

The dark sections use photos from [Unsplash](https://unsplash.com) instead of color gradients: the hero slides, the two banners, the wide banner, the flash sale, the special prices section, the story section and the category banner. A dark tint goes over each photo so the text stays readable.

Change them in `CONFIG.photos` (flash sale, special prices, story, category banner, and `collections` for a photo per category id) and in the `photo` field of each hero slide and banner. A value is an Unsplash photo id (the part after `photo-` in an `images.unsplash.com/photo-...` link) or any full image URL, for example a photo uploaded to your Salla store. An empty value gives a plain dark background. The images load from Unsplash's own servers, as Unsplash asks.

Categories without their own image in Salla get a photo that matches their name (phones, laptops, tablets, headphones, earbuds, smart watches, gaming, cameras, TVs, accessories) instead of their first letter: in the home categories row, the quiz and the category tiles. The keyword list is `CONFIG.photos.categories`, and `CONFIG.photos.category` is the photo for any other category. An image you set on a category in Salla always comes first. Reviews show a person icon instead of the reviewer's initial.

In the preview the same photos are served as local copies (`img/u/`), because the Claude preview can't load images from other sites.

## Product page layouts

The product page comes in two layouts. Pick one in `CONFIG.product.layout`, or set a layout for the products of some categories in `CONFIG.product.layouts` (by category id, for example `{ 123456: 'studio' }`).

- **`classic`** (default): Raed's own product page.
- **`studio`**: the name, rating and price move to a header across the top with perks chips (delivery, warranty, returns). Under it, a large photo gallery with a thumbnail rail, swipe on phones, a photo counter and a full-screen viewer, and the full description in an "عن المنتج" panel. On the other side, a sticky buy card holds the theme's own form.

The studio layout never moves or rebuilds Raed's form: options, the live price, quantity, add to cart, installments and quick order are the theme's own and keep working. It only moves the static title, top price and description, and builds the gallery from the slider's own image list. The theme slider stays on the page (hidden), and when an option with its own photo is picked, the gallery follows it. Products with a video or 3D image keep Raed's slider. If Raed's class names ever change, set them in `CONFIG.product.studio` (`row`, `gallery`, `slider`, `info`); if they aren't found the theme's page shows unchanged.

In the preview, phone products use the studio layout and the other categories the classic one. Products in the preview have a priced warranty option to show the price updating, and two close-up photos cut from the product photo.

## Cart drawer

The cart icon in the header (and any link to the cart page, such as the cart button in the mobile bar) opens a side panel instead of leaving the page. It shows the items with photo, price, a quantity stepper and a delete button, the free-shipping progress bar, the subtotal, and buttons for checkout and the full cart page. It also opens by itself after a product is added to the cart.

It uses Salla's own cart (`salla.cart.details`, `updateItem`, `deleteItem` and the cart events), so it always matches the real cart. It's not shown on the cart and checkout pages. Settings are in `CONFIG.shopping.cartDrawer`: turn it off, stop it opening after an add (`openOnAdd: false`), change the title, or point the checkout button somewhere else (`checkoutUrl`; empty means the cart page, where Salla's checkout starts).

## Category page

The category page (`product.index`) comes in two layouts. Pick one in `CONFIG.collection.layout`, or set a different layout for some categories in `CONFIG.collection.layouts` (by category id, for example `{ 123456: 'showroom' }`).

- **`banner`** (default): a dark banner with the category name, live stats (product count, lowest price, how many are on sale), a few product photos, and quick links to the other categories.
- **`showroom`**: a light editorial header with a large title and a stats strip, the categories as underlined tabs, "مختارات القسم" (the product with the biggest discount, the cheapest one and a newer one, each with add to cart and a wishlist heart), a grid / list switch above the theme's product list, softer product cards, and photo tiles linking to the other categories at the end of the page.

Both layouts only add sections around the theme's own product list. Raed's filters, sorting, paging and product links keep working. The list view is remembered in the visitor's browser. In the preview, each category has its own layout: laptops (لابتوبات) use the banner layout, and phones (جوالات) and the other categories use the showroom layout.

## Before importing products

Create these categories in Salla first, spelled exactly: جوالات، لابتوبات، تابلت، سماعات، ساعات ذكية، ألعاب، إكسسوارات.
Brands are left empty in the import file; add them in Salla (with logos) and assign later.

## Photo credits

Product photos are from [Unsplash](https://unsplash.com) under the Unsplash License (free for commercial use). They show the product type, not always the exact model or color. Replace them with official photos from your supplier before selling.
