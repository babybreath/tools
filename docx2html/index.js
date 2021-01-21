(function () {
  var fileDownload = document.getElementById('fileDownload');
  var fileName = '';
  var tip = document.getElementById('tip');
  var dragbox = document.getElementById('dragbox');
  dragbox.addEventListener('dragenter', function () {
    tip.innerHTML = '释放鼠标'
  }, false);

  dragbox.addEventListener('dragleave', function () {
    tip.innerHTML = '拖放到此处';
  });
  dragbox.addEventListener('dragover', function (ev) {
    console.log('鼠标正在上面');
    ev.preventDefault();
  });
  dragbox.addEventListener('drop', function (ev) {
    ev.preventDefault();
    tip.innerHTML = '拖放文件或点击Upload上传'
    let file = ev.dataTransfer.files[0];
    readFileInputEventAsArrayBuffer(file, function (arrayBuffer) {
      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then(displayResult)
        .done();
    });
  }, false)
  document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById("inputFile").click();
  }, false)
  document.getElementById("inputFile")
    .addEventListener("change", handleFileSelect, false);

  function handleFileSelect(event) {
    var file = event.target.files[0];
    readFileInputEventAsArrayBuffer(file, function (arrayBuffer) {
      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then(displayResult)
        .done();
    });
  }

  fileDownload.addEventListener('click', function () {
    var htmlFileName = fileName.replace('.docx', '.html');
    var value = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + fileName.replace('.docx', '') + '</title></head><body>'
      + currentValue
      + '</body></html>'
    var file = new File([value], htmlFileName, { type: "text/plain;charset=utf-8" });
    saveAs(file);
  }, false);

  var currentValue;

  function displayResult(result) {
    // 文件下载
    var htmlFileName = fileName.replace('.docx', '.html');
    fileDownload.innerHTML = htmlFileName;
    currentValue = result.value;

    document.getElementById("result").innerHTML = result.value;

    var messageHtml = result.messages.map(function (message) {
      return '<li class="' + message.type + '">' + escapeHtml(message.message) + "</li>";
    }).join("");

    document.getElementById("messages").innerHTML = "<ul>" + messageHtml + "</ul>";
  }

  function readFileInputEventAsArrayBuffer(file, callback) {
    // var file = event.target.files[0];
    fileName = file.name;
    if (!/\.docx$/.test(fileName)) {
      alert('只支持 docx 文件');
      return;
    }

    var reader = new FileReader();

    reader.onload = function (loadEvent) {
      var arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
})();
