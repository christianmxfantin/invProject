let offset = 0
const products = require('../models').products



module.exports = {
    search: (req, res) => {
        res.status(200).render('products/show', 
                {
                    title: 'Productos',
                    background: 'none',
                    search: 'search'
                })
    },
    show: (req, res) => {
        products.findAndCountAll({ limit: 10, offset })
          .then(rows => {
            res.status(200).render('products/show', 
                {
                    title: 'Productos',
                    background: 'none',
                    username: req.session.name,
                    search: 'none',
                    totItems: rows.count,
                    pages: 1,
                    action: req.params.action,
                    totPages: Math.ceil(rows.count / 10),
                    rows,
                })
        }).catch(err => console.log(err))
    },
    create: (req, res) => {
        products.create({ 
                username: req.session.username,
                description: req.body.description,
                unit_price: req.body.unit_price,
                quantity: req.body.quantity
            })
            .then(result => {
                products.findAndCountAll({ limit: 10, offset })
                    .then(rows => {
                        res.status(200).render('products/show', 
                            {
                                errors: {
                                    type: 'success',
                                    msg: 'Producto agregado'
                                },
                                title: 'Productos',
                                background: 'none',
                                username: req.session.name,
                                search: 'none',
                                totItems: rows.count,
                                pages: 1,
                                action: req.params.action,
                                totPages: Math.ceil(rows.count / 10),
                                rows,
                            })
                    })
                    .catch(err => console.log(err))
            })
    },
    update: (req, res) => {
        products.update({ nombre:req.body.nombre}, { where:{id: req.params.id}})
            .then(() => res.redirect('/products/' + (req.params.id)))
            .catch(error => console.log(error))
    },
    destroy: (req, res) => {
        products.destroy({ where:{id: req.params.id} })
            .then(() => res.redirect('/products'))
            .catch(error => console.log(error))
    },
    trash: (req, res) => {
        products.destroy({ where:{id: req.params.id} })
            .then(() => res.redirect('/products'))
            .catch(error => console.log(error))
    }
}