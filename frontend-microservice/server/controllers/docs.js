function get(req, res) {
    return res.json(req.params.docId);
}

export default { get };