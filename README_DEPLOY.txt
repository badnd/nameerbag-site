V3 deployment package.

What changed:
1. Product images are embedded in HTML, so preview and direct deployment will not lose images.
2. Contact information is visible in contact sections and footer.
3. Products do not depend on localStorage.
4. Each product has an independent page under /products/.
5. Catalog search/filter/sort, product links, email inquiry buttons and WhatsApp links are included.

Deploy:
Upload all files/folders to website root. If final domain is not https://www.nameerbag.com, replace this domain in HTML, sitemap.xml and robots.txt.

V4 update:
- Restored hidden admin entry: click the top-left JY/company logo 5 times.
- Added polished WhatsApp floating button with pulse animation and chat label.
- Admin panel is kept for static-site editing notes; production changes should be regenerated into static HTML pages, not only saved in localStorage.

V5 update:
- Only product card image display was adjusted. Product images now use max-width/max-height with object-fit: contain and a taller image box, so future uploaded product photos display complete instead of being visually cropped.
- Other functions and content remain unchanged from V4.

V6 update:
- Product card image fitting is tightened: image boxes use object-fit: contain with a taller 4:3 area, so future uploaded horizontal/vertical/square product photos display complete rather than cropped.
- Product catalog category dropdown now auto-generates from each product card data-category. Add a new product card with a new category, and it appears in the dropdown automatically.
- Other layout/content/functions are preserved from V5.
