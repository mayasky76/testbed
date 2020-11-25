<template>
     <div id="navigation">
        <svg viewBox="0 0 24 24" height="24" width="24"   @click="showNav=!showNav" class="NavLogoButton">
          <defs id="defs10" />
          <path id="path2" d="M0 0h24v24H0V0z" fill="none" />
          <g
            transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)"
            id="Layer_x0020_1"
          >
            <g id="_921457168">
              <path
                class="logo-top"
                id="path2-8"
                d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z"
              />
              <path
                class="logo-bottom"
                id="path4"
                d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z"
              />
            </g>
          </g>
        </svg>

        <div id="nav_elements" :class="{'mobileHide': !showNav}">
          <router-link
            v-for="(link, index) in navIcons"
            :key="index"
            :to="link.path"
            @click.native="showNav = false"
            ><i :class="'mdi mdi-' + link.icon"></i
          ></router-link>
        </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
      showNav : false,
      navIcons: [
        {
          icon: "home",
          path: "/",
        },
        {
          icon: "book-open",
          path: "/writer",
        },
      ],
    };
  }
};
</script>

<style>


.NavLogoButton{
  margin:10px;
}

#navigation {
  position: fixed;
  background-color:var(--base-background-color);
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
  padding: 0px;
  color:var(--base-foreground-color);
  text-align: center;
  z-index: 9998;
}
#navigation a {
  color:var(--base-foreground-color);
  text-decoration: none;
}
.mobileHide{
  display:none;
}

#nav_elements {
position: fixed;
top:0px;
left:0px;
right:0px;
bottom:50px;
background-color:var(--side-tool-panel-background);
}
#nav_elements a {
  display: inline-block;
  color: var(--side-nav-bar-button-foreground);
  text-decoration: none;
  background-color:var(--side-nav-bar-button-background);
  width:50px;
  height:50px;
  padding:10px;
  margin: 10px;
  font-size: 3rem;
}
#nav_elements a:hover{
  color: var(--side-nav-bar-button-foreground-hover);
    background-color:var(--side-nav-bar-button-background-hover);
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {

.mobileHide{
  display:block;
}
#navigation {
  top:0px;

  right: auto;
  width:50px;
  height:100%;
}

#nav_elements {
position: relative;
top:0px;
left:0px;
right:0px;
bottom:0px;

background-color: transparent;
}

#nav_elements a {
  display: block;
  text-decoration: none;
  width:auto;
  height: 50px;
 margin: 0px;
   font-size: 1.5rem;
}
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>