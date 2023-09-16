export const windowHtml = `
<div class="panel panel-default 不可拖动">
    <div class="panel-heading 不可选择">
        <span data-reference="title"></span>
        <span>
            <button class="btn btn-default"><span class="glyphicon glyphicon-minus"></span></button>
            <button class="btn btn-default"><span class="glyphicon glyphicon-unchecked" data-reference="restoreOrMaximize"></span></button>
            <button class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button>
        </span>
    </div>
</div>
`

export const debugHTML = `
<div class="不可拖动">
<!--font-family: 'JetBrains Mono', 'monospace', 'courier', serif; font-weight: bold-->
    <table>
        <tr>
            <td>zIndex:</td>
            <td><span data-reference="zIndex"></span></td>
        </tr>
        <tr>
            <td>hiddenWindows:</td>
            <td><span data-reference="hiddenWindows"></span></td>
        </tr>
        <tr>
            <td>taskBar:</td>
            <td><span data-reference="taskBar"></span></td>
        </tr>
        <tr>
            <td>allWindows:</td>
            <td><span data-reference="allWindows"></span></td>
        </tr>
    </table>
</div> 
`