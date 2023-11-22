<template>
    <div>
        <input type="file" @change="handleFileUpload" />
        <button v-for="(content, index) in splitContents" :key="index" @click="downloadDoc(content, index)">
            下载议题 {{ index + 1 }}
        </button>
    </div>
</template>

<script setup>
const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const content = fs.readFileSync('path_to_your_document.docx', 'binary');
const zip = new PizZip(content);
const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });


// 假设你已经有了一个议题内容的数组
const topics = ['topic1', 'topic2', 'topic3', 'topic4'];

topics.forEach((topicContent, index) => {
  const newDoc = new Docxtemplater(new PizZip(), { paragraphLoop: true, linebreaks: true });
  // 这里你需要添加逻辑来保持头部和尾部的样式，并插入议题内容
  // ...

  // 保存新文档
  const buf = newDoc.getZip().generate({ type: 'nodebuffer' });
  fs.writeFileSync(`topic_${index + 1}.docx`, buf);
});

</script>
