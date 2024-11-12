import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// const pdfUrl = "https://determined-deer-962.convex.cloud/api/storage/ea0d6f01-c6b7-42c9-aa81-ce562c2bff3a";

export async function GET(req) {
    // 1. Load the PDF file
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const pdfUrl = searchParams.get('pdfUrl');
    console.log(pdfUrl);
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';
    docs.forEach(doc => {
        pdfTextContent = pdfTextContent + doc.pageContent;
    })

    // 2. Split the Text into Small Chucks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const output = await splitter.createDocuments([pdfTextContent]);

    let splitterList = [];
    output.forEach(doc => {
        splitterList.push(doc.pageContent);
    })
    return NextResponse.json({ result: output })
}