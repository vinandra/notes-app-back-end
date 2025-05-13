const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tag, body } = request.payload;
  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updateAt = createAt;

  const newNote = {
    title,
    tag,
    body,
    id,
    createAt,
    updateAt,
  };

  notes.push(newNote);

  const isSuceess = notes.filter((note) => note.id === id).length > 0;

  if (isSuceess) {
    const response = h.response({
      status: 'success',
      massage: 'catatan berhasil ditambahkan ',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    massage: 'catatan gagal ditambahkan ',
  });
  response.code(500);
  return response;
};

module.exports = addNoteHandler;
