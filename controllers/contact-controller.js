const createPath = require('../helpers/create-path')

const getContacts = (req, res) => {
  const title = 'Contacts'
 const contacts = [
   { name: 'Vk', link: 'https://vk.com/marat_99999' },
   { name: 'Github', link: 'https://github.com/Maratik555' }
 ]
    res.render(createPath('contacts'), {contacts,title})
}

module.exports = {
  getContacts
}