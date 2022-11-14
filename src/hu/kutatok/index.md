---
layout: "layouts/kutatok.njk"
ref: kuthome
eleventyExcludeFromCollections: true
pagination:
    data: collections.kutatok_hu
    alias: kutatok
    size: 10
---

{# TODO az excludefromcollections kiszedi a collections.all-ból is, így nem működik a nyelv-választó #}