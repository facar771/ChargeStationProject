package station.chargeStation.entities.concretes;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "reservations")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "reservation")
	private LocalDateTime reservation;

	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;
	
	@Column(name = "chargestation_id")
	private int chargeStationId;
	
}

