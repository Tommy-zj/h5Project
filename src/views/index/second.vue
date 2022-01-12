<template>
  <div>
    <MyLoad :show="loading"></MyLoad>
    <carousel></carousel>
    <div class="categorys">
      <div class="left" :style="windowHeight" ref="left">
        <ul>
          <li
            v-for="(item, index) in left"
            :key="index"
            ref="lItem"
            @click="selectLeft(index)"
          >
            <div
              :class="'left-item' + [currentIndex == index ? '-click' : '']"
              v-text="item"
            ></div>
          </li>
        </ul>
      </div>
      <div class="right" :style="windowHeight" ref="right">
        <ul>
          <li v-for="(item, index) in right" :key="index">
            <div class="right-item">
              <div
                v-text="item.catalog_name"
                class="right-item-font"
                ref="rItem"
              ></div>
              <div class="right-item-contens">
                <div
                  v-for="(i, index) in item.catalogs"
                  :key="index"
                  v-on:click="toShops(i.catalog_name, i.id)"
                >
                  <div class="contens-item">
                    <img :src="imgHost + i.icon" alt="" />
                    <p v-text="i.catalog_name"></p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script src="./js/second.js"></script>
<style src="./css/second.css"></style>
