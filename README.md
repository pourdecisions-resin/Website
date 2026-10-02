# Pour Decisions Resin & Wood — In-Stock Shop

This adds a shop page to the WordPress site at pourdecisionsresinandwood.com, using WooCommerce. You can sell what you have on hand, and each piece comes off the page by itself once it sells.

It has two parts:

1. **WooCommerce**, the free store plugin for WordPress. It handles the cart, checkout, payments, and order emails.
2. **The `pour-decisions-shop` plugin** in this repo. It sets WooCommerce up for one-of-a-kind pieces:
   - Every new product starts with **stock = 1** and **1 per order**, so you don't have to set that each time.
   - When a piece sells, its stock goes to 0 and it's **hidden from the shop automatically**.
   - The `[pd_shop]` shortcode shows everything currently available, newest first. When everything has sold, it shows a "check back soon" message instead of an empty page.

---

## One-time setup (about 20 minutes)

### 1. Install WooCommerce
1. In WordPress admin, go to **Plugins → Add New**.
2. Search for **WooCommerce**, then click **Install Now** and **Activate**.
3. The setup wizard asks for your store address, currency, and how you ship. Fill those in. You can skip the paid extensions it suggests.

### 2. Set up payments
Go to **WooCommerce → Settings → Payments**.
- **WooPayments** or **Stripe** takes credit cards, Apple Pay, and Google Pay. Connect your bank account here.
- **PayPal Payments** is optional, if your customers like PayPal.
- **Cash on delivery** works if you also sell locally or at markets.

### 3. Set up shipping (or local pickup)
Go to **WooCommerce → Settings → Shipping → Add zone**. Add a flat rate, free shipping, and/or **Local pickup**.

### 4. Install the Pour Decisions plugin
1. Download **`pour-decisions-shop.zip`** from this repo.
2. In WordPress, go to **Plugins → Add New → Upload Plugin**, choose the zip, then click **Install Now** and **Activate**.

Activating it turns on **"Hide out of stock items from the catalog"** (under WooCommerce → Settings → Products → Inventory).

### 5. Create the shop page
1. Go to **Pages → Add New** and give it a title like **Shop** or **Available Now**.
2. Add a **Shortcode** block and type:
   ```
   [pd_shop]
   ```
3. Click **Publish**.
4. Go to **Appearance → Menus** (or **Appearance → Editor → Navigation** on block themes) and add the page to your menu.

Shortcode options, if you want them:
| Example | What it does |
|---|---|
| `[pd_shop columns="4"]` | Shows 4 products per row instead of 3 |
| `[pd_shop category="cutting-boards"]` | Shows only one category, so you can build separate pages |
| `[pd_shop empty="All sold! Follow us on Facebook for new drops."]` | Uses your own wording when everything has sold |

> WooCommerce also creates its own **Shop** page, and sold items are hidden there too. Use whichever page you like.

---

## Everyday use

### Adding a new piece
1. Go to **Products → Add New**.
2. Enter a **title** (e.g. "Ocean Wave Walnut Charcuterie Board").
3. Write a **description**: size, wood type, resin colors, and care instructions.
4. Under **Product data → General**, enter the **Regular price**.
5. **Inventory** is already filled in for you (track stock on, quantity 1, limit 1 per order). If you have several identical items, such as coasters, change the quantity.
6. Under **Shipping**, enter the weight and dimensions if you charge by weight.
7. On the right side, set the **Product image** (main photo) and add more angles in the **Product gallery**.
8. Pick a **Product category** if you use them.
9. Click **Publish**. It appears on the shop page right away.

### When a piece sells
**You don't have to do anything.** WooCommerce lowers the stock to 0 and the piece disappears from the shop. You'll get an order email with the shipping details.

### If it sells somewhere else (craft show, Facebook, in person)
Go to **Products**, hover over the item, and click **Quick Edit**. Set **Stock qty** to **0** and click **Update**. It comes off the site right away.

You can also move it to the **Trash** if you don't want to keep the listing.

### Restocking a similar item
Open the old (sold) product and set its stock back to 1. Or, from the **Products** list, hover over it and click **Duplicate**. Then change the photos and title, set the stock to 1, and publish.

---

## Files in this repo
| File | Purpose |
|---|---|
| `pour-decisions-shop/pour-decisions-shop.php` | Plugin source |
| `pour-decisions-shop.zip` | The same plugin, packaged for **Plugins → Upload Plugin** |
