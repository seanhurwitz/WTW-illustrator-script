/// <reference types="types-for-adobe/Illustrator/2015.3"/>
try {
    /**********************************
     ** README https://github.com/Artchibald/WTW-illustrator-script
    
    helpers:
      alert("App V  ersion : ", app.version);
    alert("App Scripting Version: ", app.scriptingVersion);
     ***********************************/
    /**********************************
     ** GLOBAL VARIABLES
     ***********************************/
    var pngFileData = [
        { size: "24x24", offset: 9.375 },
        { size: "32x32", offset: 12.5 },
        { size: "48x48", offset: 18.75 },
        { size: "64x64", offset: 25 },
        { size: "300x300", offset: 117.2 },
        { size: "512x512", offset: 12.5 },
    ];
    var filenameArray = ["SVG", "EPS"];
    for (var _i = 0, pngFileData_1 = pngFileData; _i < pngFileData_1.length; _i++) {
        var file = pngFileData_1[_i];
        filenameArray.push(file.size);
    }
    var rootPath_1 = app.activeDocument.path.toString();
    var layers = app.activeDocument.layers;
    /**********************************
     ** INSTRUCTIONS DIALOG
     ***********************************/
    alert("FULL README: https://github.com/Artchibald/WTW-illustrator-script /n/n Artboard size must be exactly 256px x 256px. \n\n Guides must be on a layer called exactly 'Guides (DO NOT MOVE)'. \n\n Make sure all layers and sublayers are invisible and unlocked to avoid bugs. \n\n Make sure all icons are on sublayers inside the layer called 'icons' with correct naming. \n\n Make sure all background colors are on individual layers after the icons layer with correct layer names.Exported assets will be saved where the.ai file is saved. \n\n The document will close without saving changes when complete so make sure you have saved your work so you can re - open it.");
    /**********************************
     ** MAKE ICONS LAYER VISIBLE
     ***********************************/
    try {
        // alert(app.version);
        layers["icons"].visible = true;
    }
    catch (e) {
        alert("can't locate the top level layer called 'icons', the script won't work without it.", e.message);
    }
    /**********************************
     ** REMOVE GUIDES LAYER
     ***********************************/
    try {
        var guideLayer = layers["Guides (DO NOT MOVE)"];
        guideLayer.visible = true;
        guideLayer.locked = false;
        guideLayer.remove();
    }
    catch (e) {
        alert("the guide layer doesn't exist, the script will still work though.", e.message);
    }
    /**********************************
     ** CREATE REQUIRED FOLDERS
     ***********************************/
    try {
        for (var _a = 0, filenameArray_1 = filenameArray; _a < filenameArray_1.length; _a++) {
            var filename = filenameArray_1[_a];
            var destFolder = Folder(rootPath_1 + "/" + filename);
            if (!destFolder.exists)
                destFolder.create();
        }
    }
    catch (e) {
        alert("Something went wrong while creating the folders.", e.message);
    }
    /**********************************
     ** MAIN EXPORT LOOP
     ***********************************/
    try {
        var myIconsLayer = layers["icons"];
        var myIconsSublayers_2 = myIconsLayer.layers;
        for (var _b = 0, layers_1 = layers; _b < layers_1.length; _b++) {
            var bgLayer = layers_1[_b];
            bgLayer.visible = true;
            for (var _c = 0, pngFileData_2 = pngFileData; _c < pngFileData_2.length; _c++) {
                var pngFileObject = pngFileData_2[_c];
                for (var _d = 0, myIconsSublayers_1 = myIconsSublayers_2; _d < myIconsSublayers_1.length; _d++) {
                    var iconLayer = myIconsSublayers_1[_d];
                    iconLayer.visible = true;
                    var pngFile = new File(rootPath_1 + "/" + pngFileObject.size + "/" + iconLayer.name + bgLayer.name + ".png");
                    ExportOptionsPNG24.antiAliasing = false;
                    ExportOptionsPNG24.transparency = true;
                    ExportOptionsPNG24.artBoardClipping = true;
                    ExportOptionsPNG24.horizontalScale = pngFileObject.offset;
                    ExportOptionsPNG24.verticalScale = pngFileObject.offset;
                    app.activeDocument.exportFile(pngFile, ExportType.PNG24, new ExportOptionsPNG24());
                    iconLayer.visible = false;
                }
            }
            saveAsSVG(bgLayer.name);
            saveAsEPS(bgLayer.name);
            bgLayer.visible = false;
        }
        function saveAsSVG(layerName) {
            for (var _i = 0, myIconsSublayers_3 = myIconsSublayers_2; _i < myIconsSublayers_3.length; _i++) {
                var iconLayer = myIconsSublayers_3[_i];
                iconLayer.visible = true;
                var svgFile = new File(rootPath_1 + "/SVG/" + iconLayer.name + layerName + ".svg");
                ExportOptionsSVG.embedRasterImages = true;
                ExportOptionsSVG.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
                app.activeDocument.exportFile(svgFile, ExportType.SVG, new ExportOptionsSVG());
                iconLayer.visible = false;
            }
        }
        function saveAsEPS(layerName) {
            for (var _i = 0, myIconsSublayers_4 = myIconsSublayers_2; _i < myIconsSublayers_4.length; _i++) {
                var iconLayer = myIconsSublayers_4[_i];
                iconLayer.visible = true;
                var epsFile = new File(rootPath_1 + "/EPS/" + iconLayer.name + layerName + ".eps");
                EPSSaveOptions.cmykPostScript = false;
                EPSSaveOptions.embedAllFonts = false;
                EPSSaveOptions.artboardRange = "";
                EPSSaveOptions.embedLinkedFiles = true;
                EPSSaveOptions.includeDocumentThumbnails = true;
                EPSSaveOptions.saveMultipleArtboards = true;
                app.activeDocument.saveAs(epsFile, new EPSSaveOptions());
                iconLayer.visible = false;
            }
        }
    }
    catch (e) {
        alert("Something went wrong while trying to export the icons.", e.message);
    }
    /**********************************
     ** LOOP LAYER VISIBILITY OF ICONS AGAINST BACKGROUND COLORS AND EXECUTE SAVE FUNCTIONS
     ***********************************/
    // separate SVG and EPS into their own loops after duplicating main file script research?
    // for (let i = 1; i < layers.length; i++) {
    //   var bgLayer = layers[i];
    //   bgLayer.visible = true;
    //   saveAsSVG(bgLayer.name);
    //   saveAsEPS(bgLayer.name);
    //   bgLayer.visible = false;
    // }
    // revert the doc from a .svg to a .ai, I don't want it to be svg!
    DocumentType.ILLUSTRATOR;
    app.activeDocument.save();
    // close the document here without saving, uncomment for prod
    // app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
catch (e) {
    alert(e.message);
}
