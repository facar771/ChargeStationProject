package station.chargeStation.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;

import station.chargeStation.entities.concretes.Token;

public interface TokenRepository extends JpaRepository<Token, Integer>{

}
