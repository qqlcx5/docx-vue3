<template>
    <div>
        <input type="file" @change="handleFileUpload" />
        <button v-for="(content, index) in splitContents" :key="index" @click="downloadDoc(content, index)">
            下载议题 {{ index + 1 }}
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';
import { parseAndSplitDocument, convertHtmlToDocxElements } from './wordHelpers.js';
const splitContents = ref([]);

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 假设你有一个方法来解析原始文档并分割议题
    const { header, footer, topics } = await parseAndSplitDocument(file);
    // console.log(`🚀 - handleFileUpload - header:`, header);
    // console.log(`🚀 - handleFileUpload - footer:`, footer);
    // console.log(`🚀 - handleFileUpload - topics:`, topics);

    // 将分割后的议题内容以及头部和尾部保存在splitContents中
    splitContents.value = topics.map((topicContent) => ({
        header,
        content: topicContent,
        footer,
    }));
};
const downloadDoc = async (splitContent, index) => {
    console.log(`🚀 - downloadDoc - splitContent, index:`, [
        ...convertHtmlToDocxElements(splitContent.header),
        // 添加议题内容
        ...convertHtmlToDocxElements(splitContent.content),
        // 添加尾部
        ...convertHtmlToDocxElements(splitContent.footer),
    ]);
    // 创建新的Word文档
    let doc;
    try {
        doc = new Document();
    } catch (error) {
        console.log(`🚀 - downloadDoc - error:`, doc, error);
    }

    // 添加头部
    // doc.addSection({
    //     children: [
    //         // 假设你有一个方法来将HTML转换为docx的Paragraphs
    //         ...convertHtmlToDocxElements(splitContent.header),
    //         // 添加议题内容
    //         ...convertHtmlToDocxElements(splitContent.content),
    //         // 添加尾部
    //         ...convertHtmlToDocxElements(splitContent.footer),
    //     ],
    // });
    // console.log(`🚀 - downloadDoc - doc:`, doc);

    // // 将Document对象打包成Blob
    // const blob = await Packer.toBlob(doc);

    // // 使用file-saver库来保存文件
    // saveAs(blob, `议题_${index + 1}.docx`);
};

</script>
