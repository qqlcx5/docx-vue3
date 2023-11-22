import { saveAs } from 'file-saver';
import mammoth from 'mammoth';
import { asBlob } from 'html-docx-js-typescript';
import { Document, Packer, Paragraph } from 'docx';


export const splitIntoTopics = (text) => {
    // 假设每个议题都以"议题"开头，并且有一个明确的结束标记
    // 你需要根据实际文档的结构来调整这个函数
    const topicStart = '议题';
    const topics = text.split(new RegExp(`${topicStart}[一二三四五六七八九十]+：`));
    return topics.slice(1).map((topic, index) => `${topicStart}${index + 1}：${topic}`);
};

export const createWordDocument = (topicText, index) => {
    // 这里需要实现一个函数，用于创建Word文档
    // 并使用file-saver保存文件
    const header = '继续教育学院\n党政联席会会议纪要\n\n'; // 根据实际需要调整
    const footer = '\n参加人员：XXX、XX、XX\n列席人员：XX、XX、XXX、XXX\n记    录：XXX\n纪要整理：XXX\n\n发：院内各科室\n抄送：学校办公室\n继续教育学院办公室          2023年 10 月 23 日印发'; // 根据实际需要调整
    const fullText = `${header}${topicText}${footer}`;
    const blob = new Blob([fullText], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `Topic_${index}.docx`);
};



// 解析Word文档并按议题分割
// 这里应该是解析Word内容并按议题分割的逻辑
// 同时提取头部和尾部
// 返回一个对象，包含头部、尾部和分割后的议题内容
export async function parseAndSplitDocument(file) {
    // 使用mammoth.js将Word文档转换为HTML
    const arrayBuffer = await file.arrayBuffer();
    // 自定义样式映射
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;

    // 使用DOM解析器来处理HTML，这比正则表达式更可靠
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 提取头部信息
    const header = doc.querySelector('table').outerHTML;

    // 提取尾部信息
    const footerHtml = doc.body.innerHTML;
    const footerIndex = footerHtml.lastIndexOf('<p><strong>议题');
    const footer = footerHtml.substring(footerIndex);

    // 提取议题
    const topics = [];
    const topicElements = doc.querySelectorAll('p > strong');
    topicElements.forEach((topic) => {
        // 检查是否是议题的开始
        if (topic.textContent.startsWith('议题')) {
            // 获取议题文本内容直到下一个议题的开始或文档结束
            let topicContent = '';
            let nextSibling = topic.parentElement.nextElementSibling;
            while (nextSibling && !nextSibling.querySelector('strong')) {
                topicContent += nextSibling.outerHTML;
                nextSibling = nextSibling.nextElementSibling;
            }
            topics.push(topic.parentElement.outerHTML + topicContent);
        }
    });

    return {
        header,
        footer,
        topics,
    };
}


// 将HTML转换为docx格式
// 这里应该是将HTML转换为docx的Paragraphs和其他结构的逻辑
// 这个例子只是简单地创建了一个段落
export function convertHtmlToDocxElements(html) {
    // 使用html-to-docx库将HTML转换为docx格式
    const doc = new Document();
    const paragraphs = html.split('\n').map(text => new Paragraph(text));
    doc.addSection({ children: paragraphs });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'example.docx');
    });
}
