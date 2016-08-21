ubuntu 64位安装DrClient

编译环境：build-essential gcc g++

32位库： lib32z1
(必须先安装32位的运行库，否则程序无法报任何信息）
提示的缺少的库：

{

libSM.so.6 libXi.so.6: libXrender.so.1 libXrandr.so.2

libXcursor.so.1 libXinerama.so.1 libfreetype.so.6 libfontconfig.so.1

libstdc++.so.6

}

实际要安装的库：

libsm6:i386 libxi6:i386 libxrender1:i386 libxrandr2:i386

libxcursor1:i386 libxinerama1:i386 libfreetype6:i386 libfontconfig1:i386 libstdc++6:i386
