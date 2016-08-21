---
title: linux-制作启动盘
date: 2016-08-21 17:36:47
tags:
- dd
- 启动盘
-
categories: linux
---
# dd制作启动盘
```bash
dd -i /path/to/ubuntu16.04.iso -o /dev/sdx
#sdx x指的是第几块硬盘 不能是sdx1,sdx2等磁盘分区，而是整块硬盘，通过lsblk可显示块设备
➜  hexo lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
nvme0n1     259:0    0 238.5G  0 disk
├─nvme0n1p1 259:1    0  18.7G  0 part /
├─nvme0n1p2 259:2    0   1.9G  0 part /boot
├─nvme0n1p3 259:3    0     1K  0 part
├─nvme0n1p5 259:4    0  15.1G  0 part [SWAP]
└─nvme0n1p6 259:5    0 202.9G  0 part /home
#我的本机硬盘是ssd，识别的时候名称不再是传统的命令方式
```
