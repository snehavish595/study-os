/**
 * StudyOS Persistence Architecture Engine
 * Handles decoupled local storage write/read schemas safely
 */
const StudyStorage = {
    SCHEMA_VERSION: '1.0.0',
    KEY: 'STUDYOS_STATE_DATA',

    getInitialState() {
        return {
            version: this.SCHEMA_VERSION,
            streak: 3,
            tasks: [
                { id: '1', title: 'Revise Quantitative Aptitude Formulae', completed: false, subject: 'Mathematics', priority: 'high' },
                { id: '2', title: 'Analyze mock test paper #4 solutions', completed: true, subject: 'General Studies', priority: 'medium' }
            ],
            habits: [
                { id: '1', name: 'Solve 10 Data Interpretation Sets', history: ['2026-06-01', '2026-06-02'] },
                { id: '2', name: 'Read Editorial & Vocabulary Parsing', history: ['2026-06-02'] }
            ],
            goals: [
                { id: '1', title: 'Complete Banking Awareness Syllabus', progress: 65, category: 'Exam Prep' }
            ],
            countdown: { eventName: 'IBPS SO Mains Exam', targetDate: '2026-12-15' },
            notes: [
                { id: '1', title: 'High Yield Economy Triggers', content: 'Focus macro indicators, repo rate shifts, baseline trends for RBI reviews.', updatedAt: new Date().toLocaleDateString() }
            ],
            performance: {
                subjects: ['Mathematics', 'Reasoning', 'English', 'General Awareness', 'Professional Knowledge'],
                scores: [78, 85, 92, 74, 88]
            }
        };
    },

    load() {
        try {
            const serialized = localStorage.getItem(this.KEY);
            if (!serialized) {
                const baseState = this.getInitialState();
                this.save(baseState);
                return baseState;
            }
            return JSON.parse(serialized);
        } catch (e) {
            console.error("State core error loading structure: ", e);
            return this.getInitialState();
        }
    },

    save(state) {
        try {
            localStorage.setItem(this.KEY, JSON.stringify(state));
        } catch (e) {
            console.error("State mutation serialization fault: ", e);
        }
    }
};

window.StudyStorage = StudyStorage;