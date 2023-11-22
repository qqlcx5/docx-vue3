<template>
    <div>
        <input type="file" @change="onFileChange" />
    </div>
</template>

<script setup>
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
const onFileChange = async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const file = files[0];
    console.log(`🚀 - onFileChange - file:`, file);
    const content = await file.arrayBuffer();
    console.log(`🚀 - onFileChange - content:`, content);

    // 使用PizZip加载文档内容
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    // 获取文档中的所有段落
    const paragraphs = doc.getFullText().split(/\n|\r\n/);

    // 分割文档并保存
    paragraphs.forEach((paragraph, index) => {
        // 创建新的文档并添加内容
        const newZip = new PizZip();
        const newDoc = new Docxtemplater(newZip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // 渲染新文档
        newDoc.render();

        // 生成新的文档blob并保存
        const out = newDoc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        // 使用file-saver保存文件
        saveAs(out, `议题${index + 1}.docx`);
    });
}

</script>
