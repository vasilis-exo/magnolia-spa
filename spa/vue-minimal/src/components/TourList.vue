<template>
    <div class="tourlist">
        <h1>{{ headline }}</h1>
    </div>
</template>
  
<script>
export default {
    name: "TourList",
    props: ["headline"]
};
</script>