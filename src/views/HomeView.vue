<template>
    <main>
        <h1>word分割工具</h1>
        <input type="file" @change="handleFileUpload" />
    </main>
</template>

<script setup>
import { ref } from 'vue';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';
import {
    splitIntoTopics,
    createWordDocument
} from './utils.js';

const uploadedFile = ref(null);

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadedFile.value = file;
        processWordDocument(file);
    }
};

const processWordDocument = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;
        const topics = splitIntoTopics(text); // 假设这是一个函数，用于根据议题分割文本
        console.log(`🚀 - topics.forEach - topics:`, text, topics);
        topics.forEach((topic, index) => {
            createWordDocument(topic, index + 1); // 为每个议题创建Word文档
        });
    };
    reader.readAsArrayBuffer(file);
};
</script>
