/**
 * StudyOS Glassmorphic Functional View Component Engine
 */
const StudyComponents = {
    navigationItems: [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
        { id: 'planner', label: 'Study Planner', icon: 'calendar-range' },
        { id: 'habits', label: 'Habit Matrix', icon: 'activity' },
        { id: 'pomodoro', label: 'Focus Timer', icon: 'timer' },
        { id: 'notes', label: 'Knowledge Vault', icon: 'book-open' }
    ],

    renderSidebar(currentId) {
        return this.navigationItems.map(item => `
            <button onclick="window.app.switchView('${item.id}')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                currentId === item.id 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
            }">
                <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                ${item.label}
            </button>
        `).join('');
    },

    DashboardView(state) {
        // Compute statistics values safely
        const totalTasks = state.tasks.length;
        const completeTasks = state.tasks.filter(t => t.completed).length;
        const targetDate = new Date(state.countdown.targetDate);
        const daysLeft = Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24));

        return `
            <div class="space-y-8 animate-fade-in">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight">Workspace Central Control</h1>
                        <p class="text-sm text-slate-500 dark:text-slate-400">Telemetry readouts and operational indicators for your structural preparation routines.</p>
                    </div>
                    
                    <div class="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 max-w-max">
                        <i data-lucide="flame" class="w-5 h-5 fill-current animate-pulse"></i>
                        <div>
                            <span class="text-xs uppercase tracking-wider block font-bold">Current Streak</span>
                            <span class="text-lg font-bold font-mono">${state.streak} Days Running</span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="glassmorphism p-5 rounded-2xl">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-semibold text-slate-400 uppercase">Core Task Clearance</span>
                            <span class="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600"><i data-lucide="check-circle" class="w-4 h-4"></i></span>
                        </div>
                        <h3 class="text-2xl font-bold font-mono">${completeTasks}/${totalTasks}</h3>
                        <p class="text-xs text-slate-400 mt-1">Pending strategic assignments complete</p>
                    </div>

                    <div class="glassmorphism p-5 rounded-2xl">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-semibold text-slate-400 uppercase">Target Countdown</span>
                            <span class="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"><i data-lucide="hourglass" class="w-4 h-4"></i></span>
                        </div>
                        <h3 class="text-2xl font-bold font-mono">${daysLeft > 0 ? daysLeft : 0} Days</h3>
                        <p class="text-xs text-slate-400 mt-1 truncate">${state.countdown.eventName}</p>
                    </div>

                    <div class="glassmorphism p-5 rounded-2xl">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-semibold text-slate-400 uppercase">Tracked Habits</span>
                            <span class="p-1.5 rounded-lg bg-pink-50 dark:bg-pink-500/10 text-pink-600"><i data-lucide="zap" class="w-4 h-4"></i></span>
                        </div>
                        <h3 class="text-2xl font-bold font-mono">${state.habits.length}</h3>
                        <p class="text-xs text-slate-400 mt-1">Active recurring routines mapped</p>
                    </div>

                    <div class="glassmorphism p-5 rounded-2xl">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-semibold text-slate-400 uppercase">Knowledge Base Cards</span>
                            <span class="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600"><i data-lucide="folder-heart" class="w-4 h-4"></i></span>
                        </div>
                        <h3 class="text-2xl font-bold font-mono">${state.notes.length}</h3>
                        <p class="text-xs text-slate-400 mt-1">High yield analytical files</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="lg:col-span-2 glassmorphism p-6 rounded-2xl flex flex-col justify-between">
                        <div class="mb-4">
                            <h2 class="text-lg font-bold">Radar Metric Competency Breakdown</h2>
                            <p class="text-xs text-slate-400">Subject profiling framework mapped from historical tracking mock parameters.</p>
                        </div>
                        <div class="w-full max-h-[320px] flex items-center justify-center">
                            <canvas id="performanceChart" class="max-w-full"></canvas>
                        </div>
                    </div>

                    <div class="glassmorphism p-6 rounded-2xl space-y-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <h2 class="text-lg font-bold">Task Roadmap Preview</h2>
                                <p class="text-xs text-slate-400">Immediate priority queue</p>
                            </div>
                            <button onclick="window.app.switchView('planner')" class="text-xs text-indigo-500 hover:underline">Manage</button>
                        </div>
                        <div class="space-y-2">
                            ${state.tasks.map(task => `
                                <div class="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 flex items-center gap-3">
                                    <span class="w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'}"></span>
                                    <p class="text-xs font-medium truncate flex-1 ${task.completed ? 'line-through text-slate-400' : ''}">${task.title}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    PlannerView(state) {
        return `
            <div class="space-y-6 animate-fade-in">
                <div>
                    <h1 class="text-2xl font-bold">Smart Strategic Task Manager</h1>
                    <p class="text-sm text-slate-400">Organize core daily structural modules and assign execution categories.</p>
                </div>

                <form id="task-creation-form" onsubmit="window.app.handleTaskSubmit(event)" class="glassmorphism p-4 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    <div class="sm:col-span-6 space-y-1">
                        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Task Deliverable Specification</label>
                        <input type="text" id="task-title" required placeholder="e.g. Solve 3 full structural logical reasoning sets" class="w-full bg-white dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500">
                    </div>
                    <div class="sm:col-span-3 space-y-1">
                        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Core Subject</label>
                        <select id="task-subject" class="w-full bg-white dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500">
                            ${state.performance.subjects.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <div class="sm:col-span-2 space-y-1">
                        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Priority Tier</label>
                        <select id="task-priority" class="w-full bg-white dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500">
                            <option value="high">High Tier</option>
                            <option value="medium" selected>Med Tier</option>
                            <option value="low">Low Tier</option>
                        </select>
                    </div>
                    <div class="sm:col-span-1">
                        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-2.5 transition-all flex items-center justify-center">
                            <i data-lucide="plus" class="w-5 h-5"></i>
                        </button>
                    </div>
                </form>

                <div class="space-y-2">
                    ${state.tasks.map(task => `
                        <div class="glassmorphism p-4 rounded-xl flex items-center justify-between gap-4 transition-all hover:translate-x-0.5">
                            <div class="flex items-center gap-3 min-w-0 flex-1">
                                <button onclick="window.app.toggleTask('${task.id}')" class="w-5 h-5 rounded-md border border-slate-300 dark:border-slate-700 flex items-center justify-center transition-all ${task.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}">
                                    ${task.completed ? '<i data-lucide="check" class="w-3 h-3"></i>' : ''}
                                </button>
                                <div class="min-w-0">
                                    <p class="text-sm font-medium truncate ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}">${task.title}</p>
                                    <span class="inline-flex text-[10px] bg-slate-100 dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800/80 px-2 py-0.5 rounded-md mt-1 font-mono">${task.subject}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                                    task.priority === 'high' ? 'bg-rose-500/10 text-rose-500' : task.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-400'
                                }">${task.priority}</span>
                                <button onclick="window.app.deleteTask('${task.id}')" class="text-slate-400 hover:text-rose-500 transition-colors p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    HabitsView(state) {
        return `
            <div class="space-y-6 animate-fade-in">
                <div>
                    <h1 class="text-2xl font-bold">Consistency Habit Matrix</h1>
                    <p class="text-sm text-slate-400">Lock down daily baseline parameters. Track historical progress metrics across recent timelines.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${state.habits.map(habit => `
                        <div class="glassmorphism p-5 rounded-2xl space-y-4">
                            <div class="flex justify-between items-center">
                                <h3 class="text-base font-bold">${habit.name}</h3>
                                <button onclick="window.app.checkInHabit('${habit.id}')" class="px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 text-xs font-semibold rounded-lg border border-emerald-500/20 transition-all flex items-center gap-1.5">
                                    <i data-lucide="calendar-check" class="w-3.5 h-3.5"></i> Check-In Today
                                </button>
                            </div>
                            <div>
                                <p class="text-xs text-slate-400 mb-2 font-mono uppercase tracking-wider">Historical Track Record Logging (Last 3 Slots)</p>
                                <div class="flex gap-2">
                                    ${habit.history.map(date => `<span class="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded font-mono">${date}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    PomodoroView() {
        return `
            <div class="max-w-md mx-auto text-center space-y-8 py-10 animate-fade-in">
                <div>
                    <h1 class="text-2xl font-bold">Deep Work Focus Engine</h1>
                    <p class="text-sm text-slate-400">Standard tactical time blocking protocols for optimized cognitive parsing intervals.</p>
                </div>

                <div class="w-64 h-64 mx-auto rounded-full border-4 border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center relative shadow-2xl glassmorphism">
                    <span id="pomo-time-display" class="text-5xl font-extrabold tracking-tight font-mono">25:00</span>
                    <span id="pomo-status-text" class="text-xs uppercase tracking-widest text-indigo-500 font-bold mt-2">Workspace Alpha Core</span>
                </div>

                <div class="flex justify-center gap-3">
                    <button id="pomo-toggle-btn" onclick="window.app.togglePomodoroEngine()" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center gap-2">
                        <i data-lucide="play" class="w-4 h-4"></i> Start Block
                    </button>
                    <button onclick="window.app.resetPomodoroEngine()" class="px-6 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all font-medium flex items-center gap-2">
                        <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Clear Sequence
                    </button>
                </div>
            </div>
        `;
    },

    NotesView(state) {
        return `
            <div class="space-y-6 animate-fade-in">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-bold">Analytical Knowledge Vault</h1>
                        <p class="text-sm text-slate-400">Store and organize high-yield concepts, facts, and review content.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <form onsubmit="window.app.handleNoteSubmit(event)" class="glassmorphism p-4 rounded-xl space-y-3 h-fit">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Initialize New Data Card</h3>
                        <input type="text" id="note-title" required placeholder="Concept Header Specification" class="w-full bg-white dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500">
                        <textarea id="note-content" required placeholder="Break down complex structural frameworks here..." rows="4" class="w-full bg-white dark:bg-slate-900 text-sm border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"></textarea>
                        <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2.5 rounded-xl transition-all">Persist Data Asset</button>
                    </form>

                    <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        ${state.notes.map(note => `
                            <div class="glassmorphism p-5 rounded-2xl flex flex-col justify-between space-y-4">
                                <div>
                                    <div class="flex justify-between items-start gap-2 mb-2">
                                        <h4 class="text-sm font-bold tracking-tight text-slate-900 dark:text-white">${note.title}</h4>
                                        <button onclick="window.app.deleteNote('${note.id}')" class="text-slate-400 hover:text-rose-500 transition-colors"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                                    </div>
                                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans whitespace-pre-line">${note.content}</p>
                                </div>
                                <span class="text-[9px] font-mono text-slate-400 block pt-2 border-t border-slate-100 dark:border-slate-900">Modified: ${note.updatedAt}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
};

window.StudyComponents = StudyComponents;