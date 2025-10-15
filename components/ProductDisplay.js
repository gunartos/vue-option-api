app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <h4>{{ sale }}</h4>
        <p>{{ description }}</p>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
        <p v-else>Out of Stock</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="(variant, index) in variants" 
        :key="variant.id" 
        @mouseover="updateVariant(index)" 
        class="color-circle" 
        :style="{backgroundColor: variant.color}">
        </div>
        <ul>
          <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
        </ul>
        <p>Shipping: {{ shipping }}</p>
        <div class="cart">Cart({{ cart }})</div>
        <div 
          class="button"
          :class="{disabledButton: !inStock}"
          :disabled="!inStock" 
          @click="addToCart"
        >
          Add to Cart
        </div>
        <div class="button" @click="removeCart">Remove Cart</div>
        <a :href="url">Made by Vue Mastery</a>
      </div>
    </div>
  </div>`,

  data() {
    return {
      product: product,
      brand: "Vue Mastery",
      description: description,
      image: "./assets/images/socks_green.jpg",
      url: "https://www.vuemastery.com/",
      inventory: 100,
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
      selectedVariant: 0,
      sizes: ["S", "M", "L", "XL", "XXL"],
      cart: 0,
      isActive: true,
    };
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " is on sale.";
      }
      return "";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeCart() {
      this.cart -= 1;
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
});
