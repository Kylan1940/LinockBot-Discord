class MusicManager {

    constructor() {
        /**
         * Key = Guild ID
         * Value = GuildQueue
         */
        this.queues = new Map();
    }

    /**
     * Create queue
     * @param {string} guildId
     * @param {GuildQueue} queue
     */
    create(guildId, queue) {
        this.queues.set(guildId, queue);
        return queue;
    }

    /**
     * Get queue
     * @param {string} guildId
     */
    get(guildId) {
        return this.queues.get(guildId);
    }

    /**
     * Has queue
     * @param {string} guildId
     */
    has(guildId) {
        return this.queues.has(guildId);
    }

    /**
     * Delete queue
     * @param {string} guildId
     */
    delete(guildId) {
        this.queues.delete(guildId);
    }

    /**
     * Get all queues
     */
    all() {
        return this.queues;
    }

}

module.exports = new MusicManager();