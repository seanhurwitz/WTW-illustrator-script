try {
    function saveAsPNGAt512x512Icon1() {
        var pngFile = new File(app.activeDocument.path + "/512x512/" + "icon1" + ".png");
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 512;
        ExportOptionsPNG24.verticalScale = 512;
        app.activeDocument.exportFile(pngFile, type, opts);
    }
    function saveAsPNGAt512x512Icon2() {
        var pngFile = new File(app.activeDocument.path + "/512x512/" + "icon2" + ".png");
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 512;
        ExportOptionsPNG24.verticalScale = 512;
        app.activeDocument.exportFile(pngFile, type, opts);
    }
    function saveAsPNGAt512x512Icon3() {
        var pngFile = new File(app.activeDocument.path + "/512x512/" + "icon3" + ".png");
        var type = ExportType.PNG24;
        var opts = new ExportOptionsPNG24();
        ExportOptionsPNG24.antiAliasing = false;
        ExportOptionsPNG24.transparency = true;
        ExportOptionsPNG24.artBoardClipping = true;
        ExportOptionsPNG24.horizontalScale = 512;
        ExportOptionsPNG24.verticalScale = 512;
        app.activeDocument.exportFile(pngFile, type, opts);
    }
    var bgLayer1 = app.activeDocument.layers[1];
    var bgLayer2 = app.activeDocument.layers[2];
    var bgLayer3 = app.activeDocument.layers[3];
    bgLayer1.visible = true;
    saveAsPNGAt512x512Icon1();
    bgLayer1.visible = false;
    bgLayer2.visible = true;
    saveAsPNGAt512x512Icon2();
    bgLayer2.visible = false;
    bgLayer3.visible = true;
    saveAsPNGAt512x512Icon3();
}
catch (err) {
    alert(err.message);
}
