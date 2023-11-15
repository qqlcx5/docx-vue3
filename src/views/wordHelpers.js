import { saveAs } from 'file-saver';
import mammoth from 'mammoth';
import { asBlob } from 'html-docx-js-typescript'


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
export async function parseAndSplitDocument(file) {
  // 使用mammoth.js将Word文档转换为HTML
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = result.value;

  // 使用正则表达式来分割议题和提取头部和尾部
  const header = html.match(/(.*)(?=议题一)/s)[0];
  const footer = html.match(/(议题三：.*)(?=<\/html>)/s)[0];
  const topics = html.split(/(议题一：.*?)(?=议题二：)|(议题二：.*?)(?=议题三：)|(议题三：.*?)(?=<\/html>)/s).filter(Boolean);

  return {
    header,
    footer,
    topics,
  };
}

// 将HTML转换为docx格式
export function convertHtmlToDocxElements(html) {
  // 使用html-to-docx库将HTML转换为docx格式
  console.log( 'buffer', html);
  const buffer = asBlob(html);
  return buffer;
}