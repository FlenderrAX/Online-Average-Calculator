function loadPage() {
    var notes = document.getElementsByClassName("note");
    for (var i = 0; i < notes.length; i++) {
        notes[i].value = 0.00;
        notes[i].addEventListener('input', calcAverage);
    }
    var coeffs = document.getElementsByClassName("coeff");
    for (var i = 0; i < coeffs.length; i++) {
        coeffs[i].value = 0.00;
        coeffs[i].addEventListener('input', calcAverage);
    }
}

function calcAverage() {
    var notes = document.getElementsByClassName("note");
    var coeffs = document.getElementsByClassName("coeff");
    var totalCoeff = 0;
    var totalNotes = 0;
    var noteLength = notes.length;
    let noteLabel = document.getElementById('noteLabel');
    for (var i = 0; i < notes.length; i++) {
        totalNotes += Number(notes[i].value * coeffs[i].value);
        totalCoeff += Number(coeffs[i].value);
    }
    var finalNote = (totalNotes/totalCoeff).toFixed(2)
    if (isNaN(finalNote)) {
        noteLabel.innerText = `Moyenne pondérée : ${(0).toFixed(2)}`;
    }
    else {
        noteLabel.innerText = `Moyenne pondérée : ${finalNote}`;
    }
}

function addElement() {
    let div = document.createElement('div');
    div.className = 'calcBox';
    div.innerHTML = `
        <label for="note" id="noteId">Note</label>
        <input type="number" class="note" name="note" min="0" max="20" value="0">
        <label for="coeff" id="coeffId">Coefficient</label>
        <input type="number" class="coeff" name="coeff" min="0" value="0">
        <button type="button" class="deleteBtn">Supprimer la ligne</button>
    `;
    
    let section = document.getElementsByClassName('calcBoxes')[0];
    let noteLabel = document.getElementById('noteLabel');
    section.insertBefore(div, noteLabel);

    let newNoteInput = div.querySelector('.note');
    let newCoeffInput = div.querySelector('.coeff');
    let deleteBtn = div.querySelector('.deleteBtn');

    newNoteInput.addEventListener('input', calcAverage);
    newCoeffInput.addEventListener('input', calcAverage);
    deleteBtn.addEventListener('click', function() {
        div.remove();
        calcAverage();
    });
}

window.onload = loadPage;