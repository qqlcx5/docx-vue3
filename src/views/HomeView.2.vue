<template>
    <main>
        <h1>DOCX文档分割工具</h1>
        <input type="file" @change="handleFileUpload" />

        <h1 style="margin-top: 60px;">DOC转DOCX - 在线转换文档文件</h1>
        <ul>
            <li>
                <a href="https://www.aconvert.com/cn/document/doc-to-docx/" target="_blank">aconvert.com</a>
            </li>
            <li>
                <a href="https://products.aspose.app/words/zh/conversion/doc-to-docx"
                    target="_blank">products.aspose.app</a>
            </li>
            <li>WPS软件转换</li>
        </ul>
        <img src="https://1year.pcfg.cache.wpscdn.cn/ks3_bj/wpsconfig-pcfg-bj/ks3_2fdc43414b73996e36c0cc80060b7ffa/image.png"
            alt="" srcset="">
    </main>
</template>

<script setup>
import { ref } from 'vue';
import mammoth from 'mammoth';
import {
    splitIntoTopics,
    createWordDocument
} from './wordHelpers.js';

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
        console.log(JSON.stringify(text));
        const topics = splitIntoTopics(text); // 假设这是一个函数，用于根据议题分割文本
        topics.forEach((topic, index) => {
            createWordDocument(topic, index + 1); // 为每个议题创建Word文档
        });
    };
    reader.readAsArrayBuffer(file);
};
</script>
