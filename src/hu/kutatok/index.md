---
layout: "base.njk"
---

{% for item in kutatok_hu %}
    <div class="card">
        <a href="{{item.url}}">
        <img class="card-img-top" src="{{item.img}}" alt="Title">
        <div class="card-body">
            <h4 class="card-title">{{item.name}}</h4>
            <p class="card-text">{{item.pos}}</p>
        </div>
        </a>
    </div>
{% endfor %}