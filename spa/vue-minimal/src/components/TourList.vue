<template>
  <div class="tour-list">
    <h1>{{ headline }}</h1>
    <div v-if="tours.length > 0" class="tour-list-cards">
      <div class="card" v-for="tour in tours" :key="tour.path">
        <img :src="imageBase + tour.image.renditions['480x360'].link" class="card-img-top"
          :alt="tour.image.metadata.caption" />
        <div class="card-body">
          <h5 class="card-title">{{ tour.name }}</h5>
          <p class="card-text">{{ tour.description }}</p>
        </div>
      </div>
    </div>
    <h2 v-else>No Tours found</h2>
  </div>
</template>
  
<script>
const API_ENDPOINT =
  "http://localhost:8080/magnoliaAuthor/.rest/delivery/tours";

export default {
  name: "TourList",
  props: ["headline"],
  data() {
    return {
      tours: [],
      imageBase: "http://localhost:8080"
    };
  },
  created() {
    this.fetchTours();
  },
  methods: {
    async fetchTours() {
      let response = await fetch(API_ENDPOINT);
      let data = await response.json();
      this.tours = data.results;
    }
  }
};
</script>


<style scoped>
.tour-list .tour-list-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.tour-list .tour-list-cards .card {
  max-width: 150px;
  margin-right: 15px;
  margin-bottom: 15px;
  -webkit-box-shadow: 10px 10px 28px -4px rgba(0, 0, 0, 0.53);
  -moz-box-shadow: 10px 10px 28px -4px rgba(0, 0, 0, 0.53);
  box-shadow: 10px 10px 28px -4px rgba(0, 0, 0, 0.53);
  transition: transform 0.4s ease-in-out;
  cursor: pointer;
}

.tour-list .tour-list-cards .card .card-img-top {
  width: 150px;
}

.tour-list .tour-list-cards .card .card-body {
  padding: 5px;
}

.tour-list .tour-list-cards .card .card-body .card-text {
  margin: 5px;
  opacity: 0.8;
  font-size: 10px;
  font-weight: 200;
  transition: opacity 0.8s ease-in;
}

.tour-list .tour-list-cards .card .card-body .card-title {
  margin: 0;
  font-weight: 200;
}

.tour-list .tour-list-cards .card:hover {
  transform: scale3d(1.5, 1.5, 1.5);
  transform-origin: center;
  background-color: #ffffff;
}

.tour-list .tour-list-cards .card:hover .card-body .card-text {
  opacity: 1;
}

.tour-list .tour-list-cards .card:hover .card-body .card-title {
  color: #00b39b;
}
</style>