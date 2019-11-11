const _ = require('lodash')
const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

const group = {
  displayName: 'GROUP DISPLAY NAME',
  name: 'mk_group_fit_segment',
}

describe('deals.properties.groups', () => {
  describe('get', () => {
    it('should return the list of properties groups for deals', () => {
      return hubspot.deals.properties.groups.get().then((data) => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('getAll', () => {
    it('should return the same thing as get', () => {
      return hubspot.deals.properties.groups.get().then((data) => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('upsert (create)', () => {
    it('should create or update the properties group', () => {
      return hubspot.deals.properties.groups.upsert(group).then((data) => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property('name')
      })
    })
  })

  describe('update', () => {
    group.displayName = 'MadKudo Company Fit'

    it('should update the property', () => {
      return hubspot.deals.properties.groups
        .update(group.name, group)
        .then((data) => {
          expect(data).to.be.an('object')
          expect(data).to.have.a.property('name')
          expect(data.displayName).to.equal(group.displayName)
        })
    })
  })

  describe('delete', () => {
    it('should delete property group', () => {
      const groupToDelete = Object.assign({}, group, {
        name: `mk_group_fit_segment_for_delete`,
      })
      return hubspot.deals.properties.groups
        .create(groupToDelete)
        .then(() => hubspot.deals.properties.groups.delete(groupToDelete.name))
        .then(() => hubspot.deals.properties.groups.get())
        .then((data) => {
          expect(data).to.be.an('array')
          const result = _.find(data, { name: groupToDelete.name })
          expect(result).to.be.an('undefined')
        })
    })
  })
})
