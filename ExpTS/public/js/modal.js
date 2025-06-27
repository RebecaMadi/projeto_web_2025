let majorIdToDelete = null;

function confirmDeletar(id, nome) {
    majorIdToDelete = id;
    document.getElementById('modal-msg').innerHTML =
        `Deseja mesmo apagar o curso <strong>${nome}</strong>?`;
    document.getElementById('modal-confirm').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-confirm').style.display = 'none';
    majorIdToDelete = null;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-confirmar').onclick = function() {
        if (majorIdToDelete) {
        document.getElementById('form-remove-' + majorIdToDelete).submit();
        }
    };
});
