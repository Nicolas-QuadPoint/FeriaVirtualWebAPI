function sendDbResponse(err, rowCount, rowData,outValData, callback) {
    if (err) {
        callback(err);
    } else {
        if (rowCount < 1) {
            callback(null, false);
        }
        else {
            callback(null, rowData,outValData, rowCount);
        }
    }
}

function buildRow(columns, data) {
    var row = {};
    columns.forEach(function (column) {
        row[column.metadata.colName] = column.value
    });

    data.push(row);
}

function buildOutputParam(outputparam,paramData){
    
    var newOutputParam = {};
    
    newOutputParam[paramData.name] = paramData.val;

    outputparam.push(newOutputParam);
}

function buildParam2(outputparam,paramData){
    
    var newOutputParam = {};
    
    newOutputParam[paramData.name] = paramData.val;

    outputparam.push(newOutputParam);
}


module.exports = {
    sendDbResponse: sendDbResponse,
    buildRow: buildRow,
    buildOutputParam : buildOutputParam
}