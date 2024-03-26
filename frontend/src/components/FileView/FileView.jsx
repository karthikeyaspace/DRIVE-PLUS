import React from 'react'
import './FileView.css'

const docUrl = {
  jpg: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/jpeg.jpg',
  pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  doc: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/doc/doc.doc',
  docx: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/docx/dummy.docx',
  ppt: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/ppt/ppt.ppt',
  pptx: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pptx/dummy.pptx',
  xls: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/xls/xls.xls',
}

export default function FileView (){
  return (
    <div className="outlet">
      <div className="top">
        File
      </div>
      <div className="content">
      <iframe src={`https://docs.google.com/gview?url=${docUrl.pdf}&embedded=true`} style={{ width: '100%', height: '500px' }} frameborder="0"></iframe>
      </div>
    </div>
  )
}
