<template>
	<div class="tour-list">
		<h1>{{ headline }}</h1>
		<div v-if="state.tours.length > 0" class="tour-list-cards">
			<div class="card" v-for="tour in state.tours" :key="tour.path">
				<img :src="state.imageBase + tour.image.renditions['480x360'].link" class="card-img-top"
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
  
<script setup>
import { onMounted, reactive, defineProps } from 'vue';

const API_ENDPOINT =
	'http://localhost:8080/magnoliaAuthor/.rest/delivery/tours';

defineProps({
  headline: String
});

const state = reactive({
  tours: [],
  imageBase: 'http://localhost:8080'
});


const fetchTours = async () => {
  let response = await fetch(API_ENDPOINT);
  let data = await response.json();
  state.tours = data.results;
};

onMounted(() => {
  fetchTours();
});
</script>


<style scoped lang="scss">
.tour-list {
	.tour-list-cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.card {
			max-width: 150px;
			margin-right: 15px;
			margin-bottom: 15px;
			box-shadow: 10px 10px 28px -4px rgba(0, 0, 0, 0.53);
			transition: transform 0.4s ease-in-out;
			cursor: pointer;

			&:hover {
				transform: scale3d(1.5, 1.5, 1.5);
				transform-origin: center;
				background-color: $tours-background-color;

				.card-body {
					.card-text {
						opacity: 1;
					}

					.card-title {
						color: $tours-title-color;
					}
				}
			}

			.card-img-top {
				width: 150px;
			}

			.card-body {
				padding: 5px;

				.card-text {
					margin: 5px;
					opacity: 0.8;
					font-size: 10px;
					font-weight: 200;
					transition: opacity 0.8s ease-in;
				}

				.card-title {
					margin: 0;
					font-weight: 200;
				}
			}
		}
	}
}</style>