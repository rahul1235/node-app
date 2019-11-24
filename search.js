class Search {
  constructor(data = []) {
    this.data = data;
    this.indices = {};
    this.createPhraseIndices();
  }

  createPhraseIndices() {
    this.data.forEach((detail, index) => {
      const fullName = `${detail.givenName} ${detail.middleName} ${detail.surname}`;
      const words = fullName.toLowerCase().split(' ');
      words.forEach((word, wordIndex) => {
        this.createWordIndices(word, index, wordIndex);
      });
    });
  }

  createWordIndices(word, index, wordIndex) {
    const characters = word.split('');
    characters.forEach((character) => {
      if (!this.indices[character]) {
        this.indices[character] = { ids: {} };
      }
      if (!this.indices[character].ids[wordIndex]) {
        this.indices[character].ids[wordIndex] = [];
      }
      this.indices[character].ids[wordIndex].push(index);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  query(query) {
    const words = query.split(' ').map((data) => data.trim());
    if (words.length === 0) return [];
    let results = [];
    words.forEach((word, index) => {
      const characters = word.split('');
      characters.forEach((character) => {
        const wordIndice = this.indices[character] || { ids: [] };
        results[index] = results[index] || [];
        Object.keys(wordIndice.ids).forEach((key) => {
          results[index] = [...results[index], ...wordIndice.ids[key]];
        });
        results[index] = Array.from(new Set(results[index]));
      });
    });
    results = this.getResults(results);
    const details = [];
    results.forEach((key, index) => {
      details[index] = this.data[key];
    });
    return details;
  }

  // eslint-disable-next-line class-methods-use-this
  getResults(arrays) {
    const arraysCount = arrays.length;
    const firstArray = arrays[0];
    const firstArrayCount = firstArray.length || 10;
    const result = [];
    let candidate;
    let found;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < firstArrayCount && i < 10; i++) {
      candidate = firstArray[i];
      found = true;
      // eslint-disable-next-line no-plusplus
      for (let k = 1; k < arraysCount; k++) {
        if (arrays[k].indexOf(candidate) === -1) {
          found = false;
          break;
        }
      }
      if (found) {
        result[result.length] = candidate;
      }
    }
    return result;
  }
}
module.exports = Search;
