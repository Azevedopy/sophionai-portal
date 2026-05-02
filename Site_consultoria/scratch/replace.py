import re

with open('../portal.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <style> block
content = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="css/portal.css">', content, flags=re.DOTALL)

# Replace alerts section
content = content.replace('<h4 style="margin-bottom: 16px; color: var(--primary);"><i class="fas fa-bell" style="color: var(--accent);"></i> Alertas e recomendações</h4>', '<h4><i class="fas fa-bell"></i> Alertas e recomendações</h4>')
content = content.replace('<a href="#" style="color: var(--accent);">ver</a>', '<a href="#" class="alert-action">ver</a>')
content = content.replace('<a href="#" style="color: var(--accent);">confirmar</a>', '<a href="#" class="alert-action">confirmar</a>')

# Replace footer section
footer_old = '''<div class="container" style="display: flex; justify-content: space-between; align-items: center;">
            <p style="color: var(--text-muted);">© 2025 SophionPro · Portal do Cliente</p>
            <div style="display: flex; gap: 24px;">
                <a href="#" style="color: var(--text-muted); text-decoration: none;"><i class="fas fa-question-circle"></i> Central de ajuda</a>
                <a href="#" style="color: var(--text-muted); text-decoration: none;"><i class="fas fa-comment"></i> Suporte via chat</a>
            </div>
        </div>'''
footer_new = '''<div class="container footer-content">
            <p class="footer-text">© 2025 SophionPro · Portal do Cliente</p>
            <div class="footer-links">
                <a href="#"><i class="fas fa-question-circle"></i> Central de ajuda</a>
                <a href="#"><i class="fas fa-comment"></i> Suporte via chat</a>
            </div>
        </div>'''
content = content.replace(footer_old, footer_new)

# Replace mobile bottom nav
mobile_nav_old = '''<!-- barra inferior fixa para mobile (simulação) -->
    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid var(--border-light); padding: 12px 24px; display: none; justify-content: space-around; z-index: 1000; display: none;" class="mobile-bottom-nav">
        <a href="#" style="color: var(--primary);"><i class="fas fa-home"></i></a>
        <a href="#" style="color: var(--text-muted);"><i class="fas fa-chart-line"></i></a>
        <a href="#" style="color: var(--text-muted);"><i class="fas fa-graduation-cap"></i></a>
        <a href="#" style="color: var(--text-muted);"><i class="fas fa-user"></i></a>
    </div>'''
mobile_nav_new = '''<!-- barra inferior fixa para mobile -->
    <nav class="mobile-bottom-nav">
        <a href="#" class="active"><i class="fas fa-home"></i></a>
        <a href="#"><i class="fas fa-chart-line"></i></a>
        <a href="#"><i class="fas fa-graduation-cap"></i></a>
        <a href="#"><i class="fas fa-user"></i></a>
    </nav>'''
content = content.replace(mobile_nav_old, mobile_nav_new)

with open('../portal.html', 'w', encoding='utf-8') as f:
    f.write(content)
