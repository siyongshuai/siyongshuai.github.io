---
title: 'ppt,doc转换成pdf'
tags:
  - linux
  - doc
  - ppt
  - pdf

date: 2016-08-21 19:24:17
categories: linux
---
# 批量转换成pdf
```bash
libreoffice --convert-to pdf *.ppt
libreoffice --convert-to pdf *.doc
```
# 合并pdf
```bash
pdfunite Chapter{1..22}.pdf out.pdf
pdfunite *.pdf out.pdf
pdfunite in-1.pdf in-2.pdf out.pdf
```
