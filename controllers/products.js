const products = require('../models').products

module.exports = {
    show: (req, res) => {
        products.findAll()
          .then(rows => {
            res.status(200).render('products/show', 
                {
                    rows,
                    title: 'Productos',
                    background: 'none'
                })
        }).catch(err => console.log(err))
    },
    create: (req, res) => {
        res.render('products/create')
    },
    edit: (req, res) => {
        products.findByPk(req.paramscate.id).then(row => {
            res.render('products/edit', {row})
        }).catch(error => console.log(error))
    },
    update: (req, res) => {
        products.update({ nombre:req.body.nombre}, { where:{id: req.params.id}})
            .then(() => res.redirect('/products/' + (req.params.id)))
            .catch(error => console.log(error))

        // categoria.findByPk(req.params.id).then(row => {
        //     row.nombre = req.body.nombre
        //     row.save().then(() => {
        //         res.redirect('/categorias/' + (req.params.id))
        //     })
        // }).catch(error => console.log(error))
    },
    destroy: (req, res) => {
        products.destroy({ where:{id: req.params.id} })
            .then(() => res.redirect('/products'))
            .catch(error => console.log(error))
    }
}