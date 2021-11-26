CREATE TABLE ballot( LIKE base INCLUDING ALL );

ALTER TABLE ballot ADD COLUMN proposal_id UUID;
ALTER TABLE ballot ADD COLUMN is_approved BOOLEAN;
ALTER TABLE ballot ADD COLUMN comments VARCHAR;

ALTER TABLE ballot ADD FOREIGN KEY (proposal_id) REFERENCES proposal(id);

CREATE TRIGGER ballot_update BEFORE UPDATE ON ballot FOR EACH ROW EXECUTE PROCEDURE date_updated();
