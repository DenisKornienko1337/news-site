<template lang="pug">
  .home
    h2 About
    | Some about text
    .sitemap
      h2 Sitemap
      ul
        li     
          router-link(:to="{path: '/'}")
            | Home
        li
          router-link(:to="{path: '/posts'}")
            | Posts
        li
          router-link(:to="{path: '/categories'}")
            | Categories
    .developers
      h2 Developers
      div.row
        div.col.m12.l6
          div.card.white-grey.darken-1000
            div.card-content
              span.card-title Denis Kornienko
              div.skills
                h4 Skills:
                ul
                  li - CSS3/HTML5/Pug
                  li - Javascript (ES6)
                  li - jQuery
                  li - PHP
                  li - Wordpress
                  li - VueJS
              div.contact 
                h4 Contacts:
                ul
                  li
                    span Email: 
                    | d.kornienko1337@gmail.com
                  li
                    span Telegram: 
                    | @d_kornienko

        div.col.m12.l6
          div.card.white-grey.darken-1000
            div.card-content
              span.card-title Illia Nozdrevatih
              div.skills
                h4 Skills:
                ul
                  li - CSS3/HTML5/Pug
                  li - Javascript (ES6)
                  li - VueJS
                  li - NodeJS
                  li - Express
                  li - MongoDB
              div.contact 
                h4 Contacts:
                ul
                  li
                    span Email: 
                    | noz220399@gmail.com
                  li
                    span Telegram: 
                    | @i_nozdrevatih
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style lang="scss">
.developers {
  padding-left: 10%;
  padding-right: 10%;
  ul {
    text-align: left;
    padding-left: 15% !important;
    padding-right: 15%;
    font-size: 18px;
  }
  .card {
    h4 {
      text-align: center;
    }
    .contact {
      span {
        font-weight: 700;
      }
      text-align: left;
    }
    .skills {
      ul {
        li {
          font-size: 18px;
          list-style-type: disc;
        }
      }
    }
    &-title {
      font-size: 32px !important;
      font-weight: 700 !important;
    }
  }
}
    li {
      list-style-type: none;
      display: block;
    }
</style>
