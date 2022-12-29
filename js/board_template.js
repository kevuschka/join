function renderTemplateBoardColumn(i) {
    return `<div class="board-column flex column">
                <div class="board-column-header flex cursor-p">
                    <p>${boardColumnTitle[i]}</p>
                    <div class="board-column-header-plus flex" onclick="openBoardAddtaskPopup()">+</div>
                </div>
                <div class="board-tickets w-100 flex column" id="board-column-${i}" ondrop="drop(${i})" ondragover="allowDrop(event);highlightAreas(${i})" ondragleave="removeHighlightAreas(${i})"></div>
            </div>`;
}