<template>
    <div>
        <div style="display: flex;">
            <button @click="change('wordPage1')">wordPage1</button>
            <button @click="change('wordPage2')">wordPage2</button>
            <button @click="change('wordPage3')">wordPage3</button>
            <button @click="change('wordPage4')">wordPage4</button>
        </div>
        <div>
            {{ showWordPage }}
            <wordPage1 v-if="showWordPage === 'wordPage1'" />
            <wordPage2 v-if="showWordPage === 'wordPage2'" />
            <wordPage3 v-if="showWordPage === 'wordPage3'" />
            <wordPage4 v-if="showWordPage === 'wordPage4'" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import wordPage1 from './HomeView.1.vue';
import wordPage2 from './HomeView.2.vue';
import wordPage3 from './HomeView.3.vue';
import wordPage4 from './HomeView.4.vue';
const showWordPage = ref('wordPage4');
const change = (value) => {
    showWordPage.value = value
};
</script>

<style lang="scss" scoped></style>
