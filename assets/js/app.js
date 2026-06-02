/**
 * StudyOS Main System Controller & Routing Engine
 */
class StudyOSApplication {
    constructor() {
        this.state = window.StudyStorage.load();
        this.currentView = 'dashboard';
        this.pomoTimer = null;
        this.pomoSecondsLeft = 25 * 60;
        this.pomoRunning = false;
        this.chartInstance = null;
    }

    init() {
        // Hydrate configuration rules mapping dark layout settings
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        lucide.createIcons();
    }

    toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    }

    launchApp() {
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('app-shell').classList.remove('hidden');
        this.switchView('dashboard');
    }

    switchView(viewId) {
        this.currentView = viewId;
        
        // Render navigation panel hooks updating view state
        document.getElementById('sidebar-nav').innerHTML = window.StudyComponents.renderSidebar(viewId);
        
        // Render interface templates structural viewport frame
        const viewport = document.getElementById('main-content-view');
        if (viewId === 'dashboard') viewport.innerHTML = window.StudyComponents.DashboardView(this.state);
        if (viewId === 'planner') viewport.innerHTML = window.StudyComponents.PlannerView(this.state);
        if (viewId === 'habits') viewport.innerHTML = window.StudyComponents.HabitsView(this.state);
        if (viewId === 'pomodoro') viewport.innerHTML = window.StudyComponents.PomodoroView();
        if (viewId === 'notes') viewport.innerHTML = window.StudyComponents.NotesView(this.state);

        // Instantiation hook requirements triggers
        if (viewId === 'dashboard') this.renderPerformanceChart();
        if (viewId === 'pomodoro') this.updatePomodoroDisplay();

        lucide.createIcons();
    }

    // ================= TRACKING / TASK ENGINE METHODS =================
    handleTaskSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const subject = document.getElementById('task-subject').value;
        const priority = document.getElementById('task-priority').value;

        const newTask = { id: Date.now().toString(), title, completed: false, subject, priority };
        this.state.tasks.unshift(newTask);
        window.StudyStorage.save(this.state);
        this.switchView('planner');
    }

    toggleTask(taskId) {
        this.state.tasks = this.state.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        window.StudyStorage.save(this.state);
        this.switchView('planner');
    }

    deleteTask(taskId) {
        this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
        window.StudyStorage.save(this.state);
        this.switchView('planner');
    }

    // ================= KNOWLEDGE BASE CARD ACTIONS =================
    handleNoteSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;

        const newNote = { id: Date.now().toString(), title, content, updatedAt: new Date().toLocaleDateString() };
        this.state.notes.unshift(newNote);
        window.StudyStorage.save(this.state);
        this.switchView('notes');
    }

    deleteNote(noteId) {
        this.state.notes = this.state.notes.filter(n => n.id !== noteId);
        window.StudyStorage.save(this.state);
        this.switchView('notes');
    }

    // ================= RECURRING ROUTINES / HABITS MAPPING =================
    checkInHabit(habitId) {
        const today = new Date().toISOString().split('T')[0];
        this.state.habits = this.state.habits.map(h => {
            if (h.id === habitId && !h.history.includes(today)) {
                return { ...h, history: [today, ...h.history] };
            }
            return h;
        });
        window.StudyStorage.save(this.state);
        this.switchView('habits');
    }

    // ================= POMODORO SYSTEM CONSOLE METHODS =================
    togglePomodoroEngine() {
        const btn = document.getElementById('pomo-toggle-btn');
        if (this.pomoRunning) {
            clearInterval(this.pomoTimer);
            this.pomoRunning = false;
            btn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> Resume Engine`;
            document.getElementById('pomo-status-text').innerText = "Thread Session Paused";
        } else {
            this.pomoRunning = true;
            btn.innerHTML = `<i data-lucide="pause" class="w-4 h-4"></i> Pause Block`;
            document.getElementById('pomo-status-text').innerText = "Deep Core Calculation Processing";
            this.pomoTimer = setInterval(() => {
                this.pomoSecondsLeft--;
                this.updatePomodoroDisplay();
                if (this.pomoSecondsLeft <= 0) {
                    clearInterval(this.pomoTimer);
                    alert("Focus sprint cycle verification validated complete.");
                    this.resetPomodoroEngine();
                }
            }, 1000);
        }
        lucide.createIcons();
    }

    resetPomodoroEngine() {
        clearInterval(this.pomoTimer);
        this.pomoRunning = false;
        this.pomoSecondsLeft = 25 * 60;
        this.updatePomodoroDisplay();
        const btn = document.getElementById('pomo-toggle-btn');
        if (btn) btn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> Start Block`;
        const txt = document.getElementById('pomo-status-text');
        if (txt) txt.innerText = "System Rested Ready";
        lucide.createIcons();
    }

    updatePomodoroDisplay() {
        const display = document.getElementById('pomo-time-display');
        if (!display) return;
        const mins = Math.floor(this.pomoSecondsLeft / 60).toString().padStart(2, '0');
        const secs = (this.pomoSecondsLeft % 60).toString().padStart(2, '0');
        display.innerText = `${mins}:${secs}`;
    }

    // ================= ANALYTICS CHART RADAR RENDERING ENGINE =================
    renderPerformanceChart() {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) return;

        const isDark = document.documentElement.classList.contains('dark');
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)';
        const labelColor = isDark ? '#94a3b8' : '#475569';

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.state.performance.subjects,
                datasets: [{
                    label: 'Calculated Competency Percentile',
                    data: this.state.performance.scores,
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    borderColor: '#6366f1',
                    borderWidth: 2,
                    pointBackgroundColor: '#6366f1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    r: {
                        grid: { color: gridColor },
                        angleLines: { color: gridColor },
                        pointLabels: { color: labelColor, font: { family: 'Inter', size: 11, weight: '500' } },
                        ticks: { display: false, maxTicksLimit: 5 },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new StudyOSApplication();
    window.app.init();
});