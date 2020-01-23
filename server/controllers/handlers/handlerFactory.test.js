const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const models = require('../../models/models');
const factory = require('./handlerFactory');

describe( 'Handler Factory', () => {

    context('Test getting a document', () => {
        it('Should retrieve a doc belonging to a model', async () => {

            let result = await factory.getOne(models.Site);
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

    context('Test getting all document', () => {
        it('Should retrieve all docs belonging to a model', async () => {

            let result = await factory.getAll(models.Site);
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

    context('Test creating a document', () => {
        it('Should create a doc from a model', async () => {

            let result = await factory.createOne(models.Site);
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

    context('Test creating an associated document', () => {
        it('Should create a doc from a model', async () => {

            let result = await factory.createOneAssoc(models.Site);
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

    context('Test getting public docs', () => {
        it('Should get docs that are public', async () => {

            let result = await factory.getAllPublic(models.Site);
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

    context('Test getting associated sites', () => {
        it('Should get associated sites', async () => {

            let result = await factory.getAssocSite(models.Match, models.H2H, 'h2hs');
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

    context('Test getting associated doc', () => {
        it('Should get associated doc', async () => {

            let result = await factory.getOneAssoc(models.Match, models.H2H, 'h2hs');
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

    context('Test updating a doc', () => {
        it('Should update a doc', async () => {

            let result = await factory.updateOne(models.Match);
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

    context('Test deleting a doc', () => {
        it('Should delete a doc', async () => {

            let result = await factory.deleteOne(models.Match);
            expect(result).to.exist;
            expect(result).to.have.lengthOf(3);

        });
    });

});