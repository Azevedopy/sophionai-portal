// js/auth.js
// Usando a biblioteca compatível (global 'firebase' object) para funcionar em arquivos locais (file:///)

const firebaseConfig = {
  apiKey: "AIzaSyD2Lyc1QKT4mid7zS1TRB1EkriWOBlYchs",
  authDomain: "sophionai.firebaseapp.com",
  projectId: "sophionai",
  storageBucket: "sophionai.firebasestorage.app",
  messagingSenderId: "234417357128",
  appId: "1:234417357128:web:35419e47a482ab8c28737d",
  measurementId: "G-MF029FQRJR"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const isLoginPage = window.location.pathname.includes('login.html');

if (!isLoginPage) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
}

async function saveUserToFirestore(uid, email, name) {
    try {
        const userRef = db.collection("users").doc(uid);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            await userRef.set({
                nome: name || email.split('@')[0],
                email: email,
                role: "cliente",
                plano: "Plano Iniciante"
            });
        }
    } catch (e) {
        console.error("Erro ao salvar no banco:", e);
    }
}

auth.onAuthStateChanged(async (user) => {
    if (user) {
        if (isLoginPage) {
            window.location.href = 'portal.html';
            return;
        }

        try {
            const userDoc = await db.collection("users").doc(user.uid).get();
            if (userDoc.exists) {
                updateUIWithUserData(userDoc.data());
            } else {
                updateUIWithUserData({ nome: user.displayName || user.email.split('@')[0], plano: "Plano Iniciante", role: "cliente" });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            updateUIWithUserData({ nome: "Cliente", plano: "Plano Iniciante", role: "cliente" });
        }
        
        document.body.style.opacity = '1';
        
    } else {
        if (!isLoginPage) {
            window.location.href = 'login.html';
        }
    }
});

function updateUIWithUserData(data) {
    const userNameElements = document.querySelectorAll('.user-name');
    const userPlanElements = document.querySelectorAll('.user-plan');
    const userAvatarElements = document.querySelectorAll('.user-avatar');

    userNameElements.forEach(el => el.textContent = data.nome || 'Usuário');
    userPlanElements.forEach(el => el.textContent = data.plano || 'Plano Padrão');
    
    if (data.nome) {
        const initial = data.nome.charAt(0).toUpperCase();
        userAvatarElements.forEach(el => el.textContent = initial);
    }

    if (data.role === 'admin') {
        const sidebarMenu = document.querySelector('.sidebar-menu');
        if (sidebarMenu && !document.getElementById('admin-menu-item')) {
            const adminItem = document.createElement('li');
            adminItem.className = 'sidebar-item';
            adminItem.id = 'admin-menu-item';
            adminItem.innerHTML = '<i class="fas fa-shield-alt" style="color: var(--danger);"></i> Painel Admin';
            adminItem.onclick = () => alert("Área de Gestão de Alunos (Em breve)");
            
            const badge = document.querySelector('.client-badge');
            if (badge) {
                badge.innerHTML = '<i class="fas fa-crown"></i> ADMINISTRADOR';
                badge.style.background = 'var(--danger)';
                badge.style.color = 'white';
            }

            const configItem = Array.from(sidebarMenu.children).find(item => item.textContent.includes("Configurações"));
            if (configItem) {
                sidebarMenu.insertBefore(adminItem, configItem);
            } else {
                sidebarMenu.appendChild(adminItem);
            }
        }
    }
}

window.handleAuthSubmit = async (e) => {
    e.preventDefault();
    const isRegister = window.isRegisterMode; 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nameInput = document.getElementById('name');
    
    const errorEl = document.getElementById('login-error');
    const btn = document.getElementById('submit-btn');
    
    errorEl.style.display = 'none';
    btn.textContent = 'Aguarde...';
    btn.disabled = true;

    try {
        if (isRegister) {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await saveUserToFirestore(userCredential.user.uid, email, nameInput.value);
        } else {
            await auth.signInWithEmailAndPassword(email, password);
        }
    } catch (error) {
        console.error("Auth error:", error.code, error.message);
        btn.textContent = isRegister ? 'Criar conta' : 'Entrar';
        btn.disabled = false;
        errorEl.style.display = 'block';
        
        if (error.code === 'auth/email-already-in-use') {
            errorEl.textContent = 'Este e-mail já está cadastrado.';
        } else if (error.code === 'auth/weak-password') {
            errorEl.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorEl.textContent = 'E-mail ou senha incorretos.';
        } else {
            errorEl.textContent = 'Ocorreu um erro. Verifique seus dados e tente novamente.';
        }
    }
};

window.handleGoogleLogin = async () => {
    const errorEl = document.getElementById('login-error');
    errorEl.style.display = 'none';
    
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;
        await saveUserToFirestore(user.uid, user.email, user.displayName);
    } catch (error) {
        console.error("Google Auth error:", error.code, error.message);
        errorEl.style.display = 'block';
        if (error.code === 'auth/popup-closed-by-user') {
            errorEl.textContent = 'O login com o Google foi cancelado.';
        } else {
            errorEl.textContent = 'Falha ao conectar com o Google.';
        }
    }
};

window.handleLogout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Logout error:", error);
    }
};
