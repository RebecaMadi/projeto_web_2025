let userIdToDelete = null;

function confirmDeletar(id, nome) {
    userIdToDelete = id;
    document.getElementById('modal-msg').innerHTML =
        `Deseja mesmo apagar o curso <strong>${nome}</strong>?`;
    document.getElementById('modal-confirm').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-confirm').style.display = 'none';
    userIdToDelete = null;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-confirmar').onclick = async function() {
        if (userIdToDelete) {
            try {
                const response = await fetch(`/user/remove/${userIdToDelete}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    const row = document.getElementById('row-' + userIdToDelete);
                    if (row) row.remove();
                    window.location.reload();
                } else {
                    alert('Erro ao deletar!');
                }
            } catch (e) {
                alert('Erro de conexão!');
            }
            fecharModal();
        }
    };
});
